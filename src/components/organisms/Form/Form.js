import React, { useEffect, useState } from 'react';
import Radio from 'components/atoms/Radio/Radio';
import Fieldset from 'components/molecules/Fieldset/Fieldset';
import InputField from 'components/molecules/InputField/InputField';
import Select from 'components/molecules/Select/Select';
import { useCategories } from 'hooks/useCategories';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Modal from 'components/organisms/Modal/Modal';
import CategoriesForm from '../CategoriesForm/CategoriesForm';
import Button from 'components/atoms/Button/Button';
import CurrenciesForm from '../CurrenciesForm/CurrenciesForm';
import { useCurrencies } from 'hooks/useCurrencies';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 50vw;
  min-width: 200px;
  max-width: 500px;
`;

const Form = ({ defaultValues = {}, onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const { inputCategories } = useCategories();
  const { inputCurrencies } = useCurrencies();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const showModal = (content) => {
    setIsOpen(true);
    setModalContent(content);
  };

  const handleFormSubmit = (value) => {
    onSubmit(value);
    reset();
  };

  return (
    <>
      <Modal title="Add Category" isOpen={isOpen} setIsOpen={setIsOpen}>
        {modalContent === 'category' ? <CategoriesForm /> : <CurrenciesForm />}
      </Modal>
      <StyledForm autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField
          {...register('name', { required: true, value: defaultValues.name })}
          id="name"
          type="text"
          label="Name"
          placeholder="e.g processor"
          error={errors.name ? 'Name is required' : null}
        />

        <InputField
          {...register('description', { value: defaultValues.description })}
          id="description"
          type="text"
          label="Description"
          placeholder="e.g i5 10300f"
        />

        <Select
          {...register('category', { required: true, value: defaultValues.category })}
          id="category"
          label="Choose category"
          error={errors.category ? 'Select category or add your own' : null}
        >
          <option value="" disabled hidden>
            Categories
          </option>
          {inputCategories.map((category) => {
            return (
              <option key={category} value={category}>
                {category}
              </option>
            );
          })}
        </Select>

        <Button type="button" onClick={() => showModal('category')} rounded color="dark">
          Add new category
        </Button>

        <InputField
          {...register('price', { required: true, min: 0, value: defaultValues.price })}
          id="price"
          type="number"
          step="any"
          label="Price"
          min="0"
          error={errors.price ? 'Price is required' : null}
        />

        <Fieldset legend="Currency" error={errors.currency ? <span>Select currency!</span> : null}>
          {inputCurrencies.map((currency) => (
            <Radio {...register('currency', { required: true, value: defaultValues.currency })} label={currency} value={currency} key={currency} />
          ))}
        </Fieldset>
        <Button type="button" onClick={() => showModal('currency')} rounded color="dark">
          Add new currency
        </Button>
        <Button $center rounded color="dark">
          {defaultValues.name ? 'Save changes' : 'Add item'}
        </Button>
      </StyledForm>
    </>
  );
};

export default Form;
