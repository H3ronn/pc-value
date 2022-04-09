import React from 'react';
import { useCategories } from 'hooks/useCategories';
import styled from 'styled-components';
import Select from '../Select/Select';

export const FilterSelect = styled(Select)`
  max-width: 500px;
  align-self: center;
  margin: 10px;
`;

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
