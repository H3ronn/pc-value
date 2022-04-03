import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import Form from 'components/organisms/Form/Form';
import Table from 'components/organisms/Table/Table';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const initFormValues = {
  id: 1,
  name: 'procesor',
  description: 'intel core i5-10400f',
  category: '',
  price: '1000',
  currency: 'zl',
};

const reducer = (state, element) => {
  console.log(state.length);
  return { ...state, [element.name]: element.value };
};

const App = () => {
  const [formValues, dispatch] = useReducer(reducer, initFormValues);
  const [state, setState] = useState([]);

  const handleAddItem = (e) => {
    e.preventDefault();

    setState((prevState) => [
      ...prevState,
      { ...formValues, id: prevState.length + 1 },
    ]);
  };

  const handleInputChange = (e) => {
    dispatch({ name: e.target.name, value: e.target.value });
  };

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Wrapper>
      <Form
        values={formValues}
        onChange={handleInputChange}
        onSubmit={handleAddItem}
      />
      <Table data={state} />
    </Wrapper>
  );
};

export default App;
