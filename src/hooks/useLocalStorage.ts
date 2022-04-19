import { useState, Dispatch, SetStateAction } from 'react';

type typeUseLocalStorage<T> = [
  storedValue: T,
  setValue: Dispatch<SetStateAction<T>>,
  remove: () => void
];

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): typeUseLocalStorage<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(`@tasq/${key}`);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)): void => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    localStorage.setItem(`@tasq/${key}`, JSON.stringify(valueToStore));
  };

  const remove = () => {
    localStorage.removeItem(`@tasq/${key}`);
  };

  return [storedValue, setValue, remove];
}
