import { useEffect, useState } from 'react';

const getLocalStorageData = (key, defaultValue = []) => JSON.parse(localStorage.getItem('state')) || defaultValue;

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(getLocalStorageData(key, defaultValue));

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
