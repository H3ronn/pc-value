import { useState } from 'react';
import styled from 'styled-components';

const TableHeader = styled.th`
  &:last-of-type {
    opacity: 0;
  }
  min-width: 60px;
`;

const ArrowsIcon = styled.i`
  display: inline-block;
  transform: ${({ $rotate }) => ($rotate ? 'rotate(180deg)' : null)};
  transform-origin: 50% 50%;
  margin-left: 5px;
`;

const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState('ln');
  const [order, setOrder] = useState('asc');

  const handleSortingChange = (name) => {
    let sortOrder = name === sortField && order === 'asc' ? 'desc' : 'asc';

    setSortField(name);
    setOrder(sortOrder);
    handleSorting(name, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, name, sortable }) => {
          return (
            <TableHeader key={name} onClick={sortable ? () => handleSortingChange(name) : null}>
              <span>{label}</span>
              {name === sortField ? <ArrowsIcon $rotate={order !== 'asc'} className="fas fa-angle-double-down"></ArrowsIcon> : null}
            </TableHeader>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
