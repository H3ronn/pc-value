import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useCategory } from 'hooks/useCategory';
import InputField from 'components/molecules/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import { MDBIcon } from 'mdb-react-ui-kit';

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

const CategoryItem = styled.div`
  display: inline-block;
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
`;

const CategoryButton = styled.button`
  background-color: transparent;
  border: none;
  &:hover,
  &:focus {
    transform: scale(1.1);
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

  const deleteCategory = (category) => {
    setCategories((prevCategories) => prevCategories.filter((name) => name !== category));
  };

  return (
    <>
      <div>
        {categories.map((category) => (
          <CategoryItem key={category}>
            {category}{' '}
            <CategoryButton onClick={() => deleteCategory(category)}>
              <MDBIcon far icon="trash-alt" />
            </CategoryButton>
          </CategoryItem>
        ))}
      </div>
      <StyledForm autoComplete="off" onSubmit={handleSubmit(addCategory)}>
        <InputField {...register('newCategory', { required: true, maxLength: 20 })} label="Category name" id="addCategory" type="text" />
        <Button>Add category</Button>
        {errors.newCategory ? <span>Minimum 1 letter, maximum length of the category: 20</span> : null}
        {error ? <span>Category already exist</span> : null}
      </StyledForm>
    </>
  );
};

export default CategoryForm;
