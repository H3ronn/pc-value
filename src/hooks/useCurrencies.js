import { useContext } from 'react';
import { CurrenciesContext } from 'providers/CurrenciesProvider';

export const useCurrencies = () => useContext(CurrenciesContext);
