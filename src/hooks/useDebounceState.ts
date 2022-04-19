import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useDebounceState<T>(
  initialValue: T,
  delay?: number
): [value: T, setValue: Dispatch<SetStateAction<T>>, debouncedValue: T] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [value, setValue, debouncedValue];
}
