import React, { createContext, useCallback, useEffect, useState } from 'react';
import { initialCurrencies } from 'data/initialCurrencies';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const CurrenciesContext = createContext({ inputCurrencies: initialCurrencies, allCurrencies: [], setCategories: () => {} });

const CurrenciesProvider = ({ children }) => {
  const [inputCurrencies, setCurrencies] = useLocalStorage('currencies', initialCurrencies);
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [state] = useLocalStorage('state');

  const getAllCurrencies = useCallback(
    () =>
      state.reduce((acc, item) => {
        if (acc.includes(item.category)) return acc;
        return [...acc, item.category];
      }, inputCurrencies),
    [state, inputCurrencies]
  );

  useEffect(() => {
    setAllCurrencies(getAllCurrencies());
  }, [state, getAllCurrencies]);

  return <CurrenciesContext.Provider value={{ inputCurrencies, allCurrencies, setCurrencies }}>{children}</CurrenciesContext.Provider>;
};

export default CurrenciesProvider;
