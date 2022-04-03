import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50vw;
  margin: 0 auto;
  align-items: center;
  label {
    margin-top: 10px;
  }
`;

const TableWrapper = styled.div`
  margin: 0 30px;
`;

const initFormValues = {
  name: 'nazwa',
  description: 'opis',
  category: '',
  price: 'prajs',
  currency: 'dolar',
};

const reducer = (state, element) => {
  return { ...state, [element.name]: element.value };
};

const App = () => {
  const [formValues, dispatch] = useReducer(reducer, initFormValues);
  const [state, setState] = useState([]);

  const handleAddItem = (e) => {
    e.preventDefault();

    setState((prevState) => [...prevState, formValues]);
  };

  const handleInputChange = (e) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  // useEffect(() => {
  //   console.log(formValues);
  // }, [formValues]);

  return (
    <Wrapper>
      <StyledForm>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          value={formValues.name}
          onChange={handleInputChange}
        />
        <label htmlFor="description">Description</label>
        <input
          name="description"
          id="description"
          type="text"
          value={formValues.description}
          onChange={handleInputChange}
        />
        <label htmlFor="category">Choose category</label>
        <select name="category" defaultValue="" onChange={handleInputChange}>
          <option value="" disabled hidden>
            Categories
          </option>
          <option id="components" value="components">
            computer components
          </option>
          <option id="peripherals" value="peripherals">
            peripherals
          </option>
          <option id="software" value="software">
            software
          </option>
        </select>
        <label htmlFor="price">Price</label>
        <input
          name="price"
          id="price"
          type="text"
          value={formValues.price}
          onChange={handleInputChange}
        />
        <fieldset onChange={handleInputChange}>
          <legend htmlFor="currency">Currency</legend>
          <label>
            dollar
            <input name="currency" id="currency" type="radio" value="dollar" />
          </label>
          <label>
            euro
            <input name="currency" id="currency" type="radio" value="euro" />
          </label>
          <label>
            zl
            <input name="currency" id="currency" type="radio" value="zl" />
          </label>
        </fieldset>
        <button onClick={handleAddItem}>Add</button>
      </StyledForm>
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
            {state.map(({ name, description, category, price, currency }) => (
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
    </Wrapper>
  );
};

export default App;
