import { useState } from 'react';
import { TableHeader, ArrowsIcon } from './TableHead.styles';

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
              <span>
                {label}
                {name === sortField ? <ArrowsIcon $rotate={order !== 'asc'} className="fas fa-angle-double-down"></ArrowsIcon> : null}
              </span>
            </TableHeader>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
