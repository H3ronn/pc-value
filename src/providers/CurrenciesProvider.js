import React, { createContext, useState } from 'react';
import { initialCurrencies } from 'data/initialCurrencies';
import { useLocalStorage } from 'hooks/useLocalStorage';
import useTableData from 'hooks/useTableData';

export const CurrenciesContext = createContext({
  currencies: initialCurrencies,
  setCurrencies: () => {},
  addCurrency: () => {},
  deleteCurrency: () => {},
  error: '',
});

const CurrenciesProvider = ({ children }) => {
  const [currencies, setCurrencies] = useLocalStorage('currencies', initialCurrencies);
  const { tableData } = useTableData();
  const [error, setError] = useState('');

  const addCurrency = (newCurrency) => {
    const currencyExist = currencies.some((currency) => currency === newCurrency);
    if (currencyExist) {
      return;
    }

    setCurrencies((prev) => [...prev, newCurrency]);
    return true;
  };

  const deleteCurrency = (currency) => {
    const isExist = tableData.some((el) => el.currency === currency);
    if (isExist) {
      setError('Before you delete this currency you have to delete items with this currency!');
      setTimeout(() => setError(''), 3000);
      return;
    } else {
      setError('');
      setCurrencies((prevCategories) => prevCategories.filter((name) => name !== currency));
    }
  };

  return (
    <CurrenciesContext.Provider value={{ currencies, setCurrencies, addCurrency, deleteCurrency, error }}>{children}</CurrenciesContext.Provider>
  );
};

export default CurrenciesProvider;
