import React from 'react';
import Button from 'components/atoms/Button/Button';
import styled from 'styled-components';

const TableWrapper = styled.div`
  overflow-x: auto;
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
    max-width: 30vw;
    word-break: break-all;
  }
`;

const Table = ({ data, deleteItem }) => {
  return (
    <TableWrapper>
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
          {data.map(({ id, name, description, category, price, currency }, index) => (
            <tr key={id}>
              <th>{index + 1}</th>
              <td>{name}</td>
              <td>{description}</td>
              <td>{category}</td>
              <td>{price}</td>
              <td>{currency}</td>
              <td>
                <Button onClick={() => deleteItem(id)}>Delete</Button>
                <Button onClick={() => console.log('edit soon')}>Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default Table;
