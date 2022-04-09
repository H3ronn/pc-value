import styled from 'styled-components';

export const StyledForm = styled.form`
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

export const CategoryItem = styled.div`
  display: inline-block;
  margin: 5px;
  padding: 5px;
  border: 1px solid black;
`;

export const CategoryButton = styled.button`
  background-color: transparent;
  border: none;
  &:hover,
  &:focus {
    transform: scale(1.1);
  }
`;
