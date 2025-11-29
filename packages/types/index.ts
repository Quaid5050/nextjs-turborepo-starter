// Common types shared across apps

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type Status = 'active' | 'inactive' | 'pending' | 'archived';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
