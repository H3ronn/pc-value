import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCategories } from 'hooks/useCategories';
import InputField from 'components/molecules/InputField/InputField';
import Button from 'components/atoms/Button/Button';
import { MDBIcon } from 'mdb-react-ui-kit';
import { StyledForm, CategoryItem, CategoryButton } from './CategoriesForm.styles';

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
