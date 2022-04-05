import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from 'components/organisms/Form/Form';
import Table from 'components/organisms/Table/Table';
import { getRandomId } from 'helpers/getRandomId';
import { useLocalStorage } from 'hooks/useLocalStorage';

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  gap: 20px;

  p {
    text-align: center;
  }
`;

const Informations = styled.div``;

const Main = () => {
  const [state, setState] = useLocalStorage('state', []);

  const addItem = (values) => {
    setState((prevState) => [...prevState, { ...values, id: getRandomId() }]);
  };

  const deleteItem = (id) => {
    setState((prevState) => prevState.filter((item) => item.id !== id));
  };

  const getTotalValue = () => {
    const total = state.reduce(
      (acc, item) => ({
        ...acc,
        [item.currency]: acc[item.currency] + parseInt(item.price),
      }),
      { zloty: 0, euro: 0, dollar: 0 }
    );

    return `Total value: ${total.zloty}zloty, ${total.euro}euro, ${total.dollar}$`;
  };

  const getPositionsAmount = () => state.length;

  return (
    <Wrapper>
      <Form onSubmit={addItem} />
      <Informations>
        <p>{getTotalValue()}</p>
        <p>Positions amount: {getPositionsAmount()}</p>
      </Informations>
      <Table data={state} deleteItem={deleteItem} />
    </Wrapper>
  );
};

export default Main;
