import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import { logger } from '@/libs/Logger';

/**
 * API Error types
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Retry configuration
 */
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];

/**
 * Retry delay with exponential backoff
 */
const getRetryDelay = (attempt: number): number => {
  return RETRY_DELAY * 2 ** attempt;
};

/**
 * Check if error is retryable
 */
const isRetryableError = (error: AxiosError): boolean => {
  if (!error.response) {
    // Network errors are retryable
    return true;
  }
  return RETRYABLE_STATUS_CODES.includes(error.response.status);
};

/**
 * Reusable API client instance
 * Configured with base URL and default headers
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

/**
 * Request interceptor
 * Add auth tokens, modify requests, etc.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    // Example: Get token from localStorage, cookies, or state management
    // const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      logger.debug('API Request', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    logger.error('Request error', { error: error.message });
    return Promise.reject(error);
  }
);

/**
 * Response interceptor with retry logic
 * Handle errors globally, transform responses, etc.
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful response in development
    if (process.env.NODE_ENV === 'development') {
      logger.debug('API Response', {
        status: response.status,
        url: response.config.url,
      });
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retryCount?: number };

    // Initialize retry count
    if (!originalRequest._retryCount) {
      originalRequest._retryCount = 0;
    }

    // Handle retryable errors
    if (isRetryableError(error) && originalRequest._retryCount < MAX_RETRIES) {
      originalRequest._retryCount += 1;
      const delay = getRetryDelay(originalRequest._retryCount - 1);

      logger.warn(`Retrying request (attempt ${originalRequest._retryCount}/${MAX_RETRIES})`, {
        url: originalRequest.url,
        delay,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));

      return apiClient(originalRequest);
    }

    // Handle specific error status codes
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          logger.warn('Unauthorized request', { url: originalRequest.url });
          // Example: Clear auth token and redirect
          // if (typeof window !== 'undefined') {
          //   localStorage.removeItem('authToken');
          //   window.location.href = '/login';
          // }
          break;

        case 403:
          logger.warn('Forbidden request', { url: originalRequest.url });
          break;

        case 404:
          logger.warn('Resource not found', { url: originalRequest.url });
          break;

        case 422:
          // Validation error
          logger.warn('Validation error', { url: originalRequest.url, data });
          break;

        case 429:
          logger.warn('Rate limit exceeded', { url: originalRequest.url });
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          logger.error('Server error', { status, url: originalRequest.url });
          break;

        default:
          logger.error('API error', { status, url: originalRequest.url, data });
      }

      // Create a more descriptive error
      const errorMessage =
        (data as { message?: string })?.message ||
        error.message ||
        `Request failed with status ${status}`;

      return Promise.reject(new ApiError(errorMessage, status, data));
    }

    // Handle network errors
    if (error.request) {
      logger.error('Network error', { message: error.message });
      return Promise.reject(
        new ApiError('Network error: Please check your connection', undefined, error.message)
      );
    }

    // Handle other errors
    logger.error('Unknown error', { error: error.message });
    return Promise.reject(new ApiError(error.message || 'An unexpected error occurred'));
  }
);

/**
 * Type-safe API client methods
 */
export const api = {
  get: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((response) => response.data),

  post: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((response) => response.data),

  put: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((response) => response.data),

  patch: <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((response) => response.data),

  delete: <T = unknown>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((response) => response.data),
};
