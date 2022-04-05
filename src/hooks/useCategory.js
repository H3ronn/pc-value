import { useContext } from 'react';
import { CategoriesContext } from 'providers/CategoryProvider';

export const useCategory = () => {
  return useContext(CategoriesContext);
};
