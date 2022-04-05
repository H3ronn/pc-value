import { useEffect, useState } from 'react';

const getLocalStorageData = (key, defaultValue = []) => JSON.parse(localStorage.getItem(key)) || defaultValue;

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(getLocalStorageData(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
