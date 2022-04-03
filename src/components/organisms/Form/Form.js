import React from 'react';
import styled from 'styled-components';

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

const Form = ({ values, onChange, onSubmit }) => {
  return (
    <StyledForm>
      <label htmlFor="name">Name</label>
      <input
        name="name"
        id="name"
        type="text"
        value={values.name}
        onChange={onChange}
      />
      <label htmlFor="description">Description</label>
      <input
        name="description"
        id="description"
        type="text"
        value={values.description}
        onChange={onChange}
      />
      <label htmlFor="category">Choose category</label>
      <select name="category" defaultValue="" onChange={onChange}>
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
        value={values.price}
        onChange={onChange}
      />
      <fieldset onChange={onChange}>
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
      <button onClick={onSubmit}>Add</button>
    </StyledForm>
  );
};

export default Form;
