import React, { useCallback, useEffect, useState } from 'react';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';
import Select from 'components/molecules/Select/Select';
import { useCategories } from 'hooks/useCategories';
import TableHead from './TableHead';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TableWrapper = styled.div`
  overflow-x: auto;
  padding-bottom: 100px;
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

  th {
    cursor: pointer;
    &:last-of-type {
      cursor: default;
      /* opacity: 0; */
    }
  }

  td {
    min-width: 150px;
    max-width: 350px;
    word-break: break-all;
  }
`;

const Row = styled.tr`
  &:hover {
    background-color: #dee2e6;
  }
`;

const FilterSelect = styled(Select)`
  max-width: 500px;
  margin: 10px auto;
`;

const columns = [
  { name: 'ln', label: 'Ln', sortable: true },
  { name: 'name', label: 'Name', sortable: true },
  { name: 'description', label: 'Description', sortable: true },
  { name: 'category', label: 'Category', sortable: true },
  { name: 'price', label: 'Price', sortable: true },
  { name: 'currency', label: 'Currency', sortable: true },
  { name: '', label: '', sortable: false },
];

const Table = ({ data, deleteItem, editItem }) => {
  const { allCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredData, setFilteredData] = useState(data);
  const [isReversed, setIsReversed] = useState(false);

  const handleSorting = (sortField, sortOrder) => {
    setIsReversed(false);
    if (sortField === 'ln') {
      setFilteredData(data);
      setIsReversed((prev) => (sortOrder === 'desc' ? true : false));
      return;
    }

    const sorted = [...filteredData].sort(
      (next, curr) =>
        next[sortField].localeCompare(curr[sortField], 'en', {
          numeric: true,
        }) * (sortOrder === 'asc' ? 1 : -1)
    );
    setFilteredData(sorted);
  };

  const filterByCategory = useCallback(
    (category) => {
      setFilteredData(data);
      if (category !== 'all') setFilteredData(data.filter((item) => item.category === category));
    },
    [data]
  );

  const printFilteredData = (provided) => {
    return filteredData.map(({ id, name, description, category, price, currency }, index) => (
      <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
          <Row key={id} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{description || '---'}</td>
            <td>{category}</td>
            <td>{price}</td>
            <td>{currency}</td>
            <td>
              <Button onClick={() => deleteItem(id)}>Delete</Button>
              <Button onClick={() => editItem(id)}>Edit</Button>
            </td>
          </Row>
        )}
      </Draggable>
    ));
  };

  const handleOnDragEnd = (result) => {
    const items = Array.from(filteredData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFilteredData(items);
  };

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
      <FilterSelect name="filter" id="filter" label="Filter by category" onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All</option>
        {allCategories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </FilterSelect>
      <StyledTable>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <TableHead columns={columns} handleSorting={handleSorting} />
          <Droppable droppableId="rows">
            {(provided) => (
              <tbody {...provided.droppableProps} ref={provided.innerRef}>
                {isReversed ? printFilteredData(provided).reverse() : printFilteredData(provided)}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
