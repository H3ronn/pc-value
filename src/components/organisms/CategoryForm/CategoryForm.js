import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useCategory } from 'hooks/useCategory';
import InputField from 'components/molecules/InputField/InputField';
import Button from 'components/atoms/Button/Button';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 500px;

  label {
    margin: 0;
  }

  button {
    margin-top: 10px;
  }
`;

const CategoryForm = () => {
  const { categories, setCategories } = useCategory();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(false);

  const addCategory = () => {
    setError(false);

    const newCategory = getValues('newCategory');
    const categoryExist = !!categories.find((category) => category === newCategory);
    if (categoryExist) {
      setError(true);
      return;
    }

    setCategories((prev) => [...prev, newCategory]);
    reset();
  };

  return (
    <StyledForm autoComplete="off" onSubmit={handleSubmit(addCategory)}>
      <InputField {...register('newCategory', { maxLength: 20 })} label="Category name" id="addCategory" type="text" />
      <Button>Add category</Button>
      {errors.newCategory ? <span>Maximum length of the category: 20</span> : null}
      {error ? <span>Category already exist</span> : null}
    </StyledForm>
  );
};

export default CategoryForm;
