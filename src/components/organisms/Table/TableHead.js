import React from 'react';
import { TableHeader, ArrowsIcon } from './TableHead.styles';

const TableHead = ({ columns, handleSorting, sortField, order }) => {
  return (
    <thead>
      <tr>
        {columns.map(({ label, name, sortable }) => {
          return (
            <TableHeader key={name} onClick={sortable ? () => handleSorting(name) : null}>
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
