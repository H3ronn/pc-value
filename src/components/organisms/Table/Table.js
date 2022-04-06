import React, { useCallback, useEffect, useState } from 'react';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import Select from 'components/molecules/Select/Select';
import { useCategories } from 'hooks/useCategories';

const TableWrapper = styled.div`
  overflow-x: auto;
  padding-bottom: 300px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  max-width: 100vw;
  margin: 0 auto;
  thead th {
    border-bottom: 2px solid #dee2e6;
  }

  th,
  td {
    border-top: 1px solid #dee2e6;
    padding: 12px;
  }

  td {
    min-width: 150px;
    max-width: 350px;
    /* max-width: 30vw; */
    word-break: break-all;
  }
`;

const Table = ({ data, deleteItem, editItem }) => {
  const { allCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredData, setFilteredData] = useState(data);

  const filterByCategory = useCallback(
    (category) => {
      setFilteredData(data);
      if (category !== 'all') setFilteredData(data.filter((item) => item.category === category));
    },
    [data]
  );

  useEffect(() => {
    filterByCategory(selectedCategory);
  }, [selectedCategory, filterByCategory]);

  useEffect(() => {
    //if we delete selected category it was failing
    if (!allCategories.includes(selectedCategory)) {
      setSelectedCategory('all');
    }
  }, [allCategories, selectedCategory]);

  return (
    <TableWrapper>
      <Select name="filter" id="filter" label="Filter by category" onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All</option>
        {allCategories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </Select>
      <StyledTable>
        <thead>
          <tr>
            <th>Ln</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {state.map((row) => (
              <tr>
                {Object.entries(row).map((el) => (
                  <td>{el[1]}</td>
                ))}
              </tr>
            ))} */}
          {filteredData.map(({ id, name, description, category, price, currency }, index) => (
            <tr key={id}>
              <th>{index + 1}</th>
              <td>{name}</td>
              <td>{description}</td>
              <td>{category}</td>
              <td>{price}</td>
              <td>{currency}</td>
              <td>
                <Button onClick={() => deleteItem(id)}>Delete</Button>
                <Button onClick={() => editItem(id)}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
