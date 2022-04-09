import React, { useCallback, useEffect, useState } from 'react';
import { TableWrapper, StyledTable, Td, Row, FilterSelect, ButtonsCell, DragIcon } from './Table.styles';
import Button from 'components/atoms/Button/Button';
import { useCategories } from 'hooks/useCategories';
import TableHead from './TableHead';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FilterCategories from 'components/molecules/FilterCategories/FilterCategories';

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
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isReversed, setIsReversed] = useState(false);
  const [sortField, setSortField] = useState('ln');
  const [order, setOrder] = useState('asc');

  const handleSorting = (newSortField) => {
    setSortField(newSortField);
    const newOrder = newSortField === sortField && order === 'asc' ? 'desc' : 'asc';
    setOrder(newOrder);

    // setIsReversed(false);
    if (newSortField === 'ln') {
      setFilteredData(data);
      setIsReversed((prev) => (newOrder === 'desc' ? true : false));
      return;
    }

    const sorted = [...filteredData].sort(
      (next, curr) =>
        next[newSortField].localeCompare(curr[newSortField], 'en', {
          numeric: true,
        }) * (newOrder === 'asc' ? 1 : -1)
    );
    setFilteredData(sorted);
  };
  const getSortedData = useCallback(
    (tableData) => {
      setIsReversed(false);
      if (sortField === 'ln') {
        setIsReversed((prev) => (order === 'desc' ? true : false));
        return tableData;
      }

      const sorted = [...tableData].sort(
        (next, curr) =>
          next[sortField].localeCompare(curr[sortField], 'en', {
            numeric: true,
          }) * (order === 'asc' ? 1 : -1)
      );
      return sorted;
    },
    [order, sortField]
  );

  const getFilteredData = useCallback(
    (category) => {
      if (category === 'all') return data;
      console.log(data.filter((item) => item.category === category));
      return data.filter((item) => item.category === category);
    },
    [data]
  );

  const sortAndFilterData = useCallback(() => {
    const afterFilter = getFilteredData(selectedCategory);
    const afterSort = getSortedData(afterFilter);
    setFilteredData(afterSort);
  }, [getFilteredData, getSortedData, selectedCategory]);

  useEffect(() => {
    sortAndFilterData();
  }, [selectedCategory, sortAndFilterData, data]);

  useEffect(() => {
    // disable filter when we delete selected category
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory('all');
    }
  }, [categories, getFilteredData, selectedCategory]);

  const handleOnDragEnd = (result) => {
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateData(items);
  };

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
      <FilterCategories onChange={setSelectedCategory} />
      <TableWrapper>
        <StyledTable>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <TableHead columns={columns} handleSorting={handleSorting} sortField={sortField} order={order} />
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
