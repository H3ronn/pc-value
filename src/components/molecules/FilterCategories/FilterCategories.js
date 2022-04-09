import React from 'react';
import { useCategories } from 'hooks/useCategories';
import { FilterSelect } from './FilterCategories.styles';

const FilterCategories = ({ onChange }) => {
  const { categories } = useCategories();

  return (
    <FilterSelect name="filter" id="filter" defaultValue="all" label="Filter by category" onChange={(e) => onChange(e.target.value)}>
      <option value="all">All</option>
      {categories.map((category) => (
        <option value={category} key={category}>
          {category}
        </option>
      ))}
    </FilterSelect>
  );
};

export default FilterCategories;
