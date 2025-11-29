# @repo/hooks

Shared React hooks package for the monorepo.

## Installation

This package is automatically available in all apps via workspace dependencies.

## Available Hooks

### `useDebouncedCallback`

Delays the execution of a function until after a specified delay.

```tsx
import { useDebouncedCallback } from '@repo/hooks';

const handleSearch = useDebouncedCallback((value: string) => {
  console.log('Searching for:', value);
}, 500);

<input onChange={(e) => handleSearch(e.target.value)} />
```

### `useDebouncedValue`

Returns a debounced version of the value. Returns a tuple with the debounced value and control functions.

```tsx
import { useDebouncedValue } from '@repo/hooks';

const [searchTerm, setSearchTerm] = useState('');
const [debouncedSearchTerm] = useDebouncedValue(searchTerm, 500);

useEffect(() => {
  if (debouncedSearchTerm) {
    // Perform search
  }
}, [debouncedSearchTerm]);
```

**Note:** You can also use `useDebounce` directly (re-exported for convenience):
```tsx
import { useDebounce } from '@repo/hooks';
const [debouncedValue, { isPending, cancel, flush }] = useDebounce(value, delay);
```

### `useLocalStorage`

Manages localStorage with React state, including cross-tab synchronization.

```tsx
import { useLocalStorage } from '@repo/hooks';

const [token, setToken, removeToken] = useLocalStorage('authToken', '');

// Set value
setToken('new-token');

// Remove value
removeToken();
```

### `useMediaQuery`

Matches media queries and updates when the viewport changes.

```tsx
import { useMediaQuery } from '@repo/hooks';

const isMobile = useMediaQuery('(max-width: 768px)');
const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

if (isMobile) {
  return <MobileView />;
}
```

## Development

```bash
# Type check
pnpm type-check

# Lint
pnpm lint
```

