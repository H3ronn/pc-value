import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  margin: 0 30px;
`;

const Table = ({ data }) => {
  return (
    <TableWrapper>
      <table>
        <thead>
          <tr>
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
          {data.map(({ name, description, category, price, currency }) => (
            <tr>
              <td>{name}</td>
              <td>{description}</td>
              <td>{category}</td>
              <td>{price}</td>
              <td>{currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
};

export default Table;
