import React, { createContext, useCallback, useEffect, useState } from 'react';
import { initialCategories } from 'data/initialCategories';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const CategoriesContext = createContext({ inputCategories: initialCategories, allCategories: [], setCategories: () => {} });

const CategoriesProvider = ({ children }) => {
  const [inputCategories, setCategories] = useLocalStorage('categories', initialCategories);
  const [allCategories, setAllCategories] = useState([]);
  const [state] = useLocalStorage('state');

  const getAllCategories = useCallback(
    () =>
      state.reduce((acc, item) => {
        if (acc.includes(item.category)) return acc;
        return [...acc, item.category];
      }, inputCategories),
    [state, inputCategories]
  );

  useEffect(() => {
    setAllCategories(getAllCategories());
  }, [state, getAllCategories]);

  return <CategoriesContext.Provider value={{ inputCategories, allCategories, setCategories }}>{children}</CategoriesContext.Provider>;
};

export default CategoriesProvider;
