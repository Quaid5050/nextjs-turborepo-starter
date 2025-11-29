import { useDebounce } from 'use-debounce';

/**
 * Debounced value hook
 * Returns a debounced version of the value
 *
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (default: 300)
 * @returns Tuple of [debouncedValue, { isPending, cancel, flush }]
 *
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('');
 * const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search
 *   }
 * }, [debouncedSearchTerm]);
 * ```
 */
export function useDebouncedValue<T>(value: T, delay = 300) {
  return useDebounce(value, delay);
}

