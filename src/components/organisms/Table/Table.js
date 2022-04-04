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

const Table = ({ data, deleteItem }) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Currency</th>
            <th></th>
            <th></th>
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
          {data.map(({ id, name, description, category, price, currency }, index) => (
            <tr key={id}>
              <th>{index + 1}</th>
              <td>{name}</td>
              <td>{description}</td>
              <td>{category}</td>
              <td>{price}</td>
              <td>{currency}</td>
              <td>
                <button onClick={() => deleteItem(id)}>Delete</button>
                <button onClick={() => console.log('edit soon')}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
