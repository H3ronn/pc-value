import React from 'react';
import { useForm } from 'react-hook-form';
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = (value) => {
    onSubmit(value);
    reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <label htmlFor="name">Name</label>
      <input {...register('name', { required: true })} id="name" type="text" />
      {errors.name ? <span>Name is required</span> : null}
      <label htmlFor="description">Description</label>
      <input {...register('description')} id="description" type="text" />
      <label htmlFor="category">Choose category</label>
      <select {...register('category', { required: true })} defaultValue="">
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
      {errors.category ? <span>Select category or add your own</span> : null}
      <label htmlFor="price">Price</label>
      <input {...register('price', { required: true })} id="price" type="number" step="any" />
      {errors.price ? <span>Price is required</span> : null}
      <fieldset>
        <legend htmlFor="currency">Currency</legend>
        <label>
          dollar
          <input {...register('currency', { required: true })} id="currency" type="radio" value="dollar" />
        </label>
        <label>
          euro
          <input {...register('currency', { required: true })} id="currency" type="radio" value="euro" />
        </label>
        <label>
          zl
          <input {...register('currency', { required: true })} id="currency" type="radio" value="zl" />
        </label>
      </fieldset>
      {errors.currency ? <span>Select currency!</span> : null}
      <button>Add</button>
    </StyledForm>
  );
};

export default Form;
