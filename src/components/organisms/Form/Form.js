import Radio from 'components/atoms/Radio/Radio';
import Fieldset from 'components/molecules/Fieldset/Fieldset';
import InputField from 'components/molecules/InputField/InputField';
import SelectField from 'components/molecules/Select/Select';
import { initialCategories } from 'data/initialCategories';
import { useCategory } from 'hooks/useCategory';
import { useLocalStorage } from 'hooks/useLocalStorage';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50vw;
  min-width: 200px;
  max-width: 500px;
`;

const Form = ({ values, onChange, onSubmit }) => {
  const { categories } = useCategory();
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
    <StyledForm autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField
        {...register('name', { required: true })}
        id="name"
        type="text"
        label="Name"
        placeholder="e.g processor"
        error={errors.name ? 'Name is required' : null}
      />

      <InputField {...register('description')} id="description" type="text" label="Description" placeholder="e.g i5 10300f" />

      <SelectField
        {...register('category', { required: true })}
        id="category"
        label="Choose category"
        error={errors.category ? 'Select category or add your own' : null}
      >
        <option value="" disabled hidden>
          Categories
        </option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </SelectField>

      <InputField
        {...register('price', { required: true, min: 0 })}
        id="price"
        type="number"
        step="any"
        label="Price"
        min="0"
        error={errors.price ? 'Price is required' : null}
      />

      <Fieldset legend="Currency" error={errors.currency ? <span>Select currency!</span> : null}>
        <Radio {...register('currency', { required: true })} label="dollar" value="dollar" />
        <Radio {...register('currency', { required: true })} label="euro" value="euro" />
        <Radio {...register('currency', { required: true })} label="zloty" value="zloty" />
      </Fieldset>

      <button>Add</button>
    </StyledForm>
  );
};

export default Form;
