import React, { useCallback, useEffect, useState } from 'react';
import { TableWrapper, StyledTable, Td, Row, FilterSelect, ButtonsCell, DragIcon } from './Table.styles';
import Button from 'components/atoms/Button/Button';
import { useCategories } from 'hooks/useCategories';
import TableHead from './TableHead';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const columns = [
  { name: 'ln', label: 'Ln', sortable: true },
  { name: 'name', label: 'Name', sortable: true },
  { name: 'description', label: 'Description', sortable: true },
  { name: 'category', label: 'Category', sortable: true },
  { name: 'price', label: 'Price', sortable: true },
  { name: 'currency', label: 'Currency', sortable: true },
  { name: '', label: '', sortable: false },
];

const Table = ({ data, updateData, deleteItem, editItem }) => {
  const { categories } = useCategories();
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
      setFilteredData(data.filter((item) => item.category === category));
      if (category === 'all') setFilteredData(data);
    },
    [data]
  );

  const handleOnDragEnd = (result) => {
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateData(items);
  };

  useEffect(() => {
    console.log(selectedCategory);
    filterByCategory(selectedCategory);
  }, [selectedCategory, filterByCategory, data]);

  // useEffect(() => {
  //   handleSorting(sortedBy, order);
  // }, [filteredData]);

  useEffect(() => {
    // disable filter when we delete category
    if (!categories.some((category) => category === selectedCategory)) {
      filterByCategory('all');
    }
  }, [categories, filterByCategory, selectedCategory]);

  const printFilteredData = (provided) => {
    return filteredData.map(({ id, name, description, category, price, currency }, index) => (
      <Draggable key={id} draggableId={id} index={index}>
        {(provided) => (
          <Row key={id} {...provided.draggableProps} ref={provided.innerRef}>
            <th>
              <DragIcon {...provided.dragHandleProps} /> {index + 1}
            </th>
            <Td wide>{name}</Td>
            <Td wide>{description || '---'}</Td>
            <Td>{category}</Td>
            <Td>{price}</Td>
            <Td>{currency}</Td>
            <ButtonsCell>
              <div>
                <Button onClick={() => deleteItem(id)}>Delete</Button>
                <Button onClick={() => editItem(id)}>Edit</Button>
              </div>
            </ButtonsCell>
          </Row>
        )}
      </Draggable>
    ));
  };

  return (
    <>
      <FilterSelect name="filter" id="filter" defaultValue="all" label="Filter by category" onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All</option>
        {categories.map((category) => (
          <option value={category} key={category}>
            {category}
          </option>
        ))}
      </FilterSelect>
      <TableWrapper>
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
    </>
  );
};

export default Table;
