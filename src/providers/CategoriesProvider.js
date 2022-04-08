import React, { createContext, useState } from 'react';
import { initialCategories } from 'data/initialCategories';
import { useLocalStorage } from 'hooks/useLocalStorage';
import useTableData from 'hooks/useTableData';

export const CategoriesContext = createContext({
  categories: initialCategories,
  setCategories: () => {},
  addCategory: () => {},
  deleteCategory: () => {},
  error: '',
});

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useLocalStorage('categories', initialCategories);
  const { tableData } = useTableData();
  const [error, setError] = useState('');

  const addCategory = (newCategory) => {
    const categoryExist = categories.some((category) => category === newCategory);
    if (categoryExist) {
      return false;
    }

    setCategories((prev) => [...prev, newCategory]);
    return true;
  };

  const deleteCategory = (category) => {
    const isExist = tableData.some((el) => el.category === category);
    if (isExist) {
      setError('Before you delete this category you have to delete items with this category!');
      setTimeout(() => setError(''), 3000);
      return;
    } else {
      setError('');
      setCategories((prevCategories) => prevCategories.filter((name) => name !== category));
    }
  };

  return (
    <CategoriesContext.Provider value={{ categories, setCategories, addCategory, deleteCategory, error }}>{children}</CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
