import React, { createContext } from 'react';
import { initialCategories } from 'data/initialCategories';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const CategoriesContext = createContext(initialCategories);

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useLocalStorage('categories', initialCategories);

  return <CategoriesContext.Provider value={{ categories, setCategories }}>{children}</CategoriesContext.Provider>;
};

export default CategoriesProvider;
