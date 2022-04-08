import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useCategories } from 'hooks/useCategories';
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

const CategoriesForm = () => {
  const { categories, addCategory, deleteCategory, error: categoriesError } = useCategories();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState(false);

  const handleAddCategory = () => {
    setError(false);

    const isAdded = addCategory(getValues('newCategory'));
    if (!isAdded) {
      setError(true);
    }

    reset();
  };

  return (
    <>
      <div>
        {categories.map((category) => (
          <CategoryItem key={category}>
            {category}
            <CategoryButton onClick={() => deleteCategory(category)}>
              <MDBIcon far icon="trash-alt" />
            </CategoryButton>
          </CategoryItem>
        ))}
        {categoriesError ? <p>{categoriesError}</p> : null}
      </div>
      <StyledForm autoComplete="off" onSubmit={handleSubmit(handleAddCategory)}>
        <InputField {...register('newCategory', { required: true, maxLength: 20 })} label="Category name" id="addCategory" type="text" />
        <Button>Add category</Button>
        {errors.newCategory ? <span>Minimum 1 letter, maximum length of the category: 20</span> : null}
        {error ? <span>Category already exist</span> : null}
      </StyledForm>
    </>
  );
};

export default CategoriesForm;
