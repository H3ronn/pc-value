import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  margin: 0 30px;
`;

const StyledTable = styled.table`
  border-collapse: collapse;

  thead th {
    border-bottom: 2px solid #dee2e6;
  }

  th,
  td {
    border-top: 1px solid #dee2e6;
    padding: 12px;
  }
`;

const Table = ({ data }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Currency</th>
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
          {data.map(({ id, name, description, category, price, currency }) => (
            <tr>
              <th>{id}</th>
              <td>{name}</td>
              <td>{description}</td>
              <td>{category}</td>
              <td>{price}</td>
              <td>{currency}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
