import { useDebouncedCallback as useDebouncedCallbackLib } from 'use-debounce';

/**
 * Debounced callback hook
 * Delays the execution of a function until after a specified delay
 *
 * @param callback - The function to debounce
 * @param delay - The delay in milliseconds (default: 300)
 * @returns Debounced callback function
 *
 * @example
 * ```tsx
 * const handleSearch = useDebouncedCallback((value: string) => {
 *   console.log('Searching for:', value);
 * }, 500);
 *
 * <input onChange={(e) => handleSearch(e.target.value)} />
 * ```
 */
export function useDebouncedCallback<T extends (...args: never[]) => void>(
  callback: T,
  delay = 300,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useDebouncedCallbackLib(callback as any, delay);
}

