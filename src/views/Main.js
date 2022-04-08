import React, { useState } from 'react';
import styled from 'styled-components';
import Form from 'components/organisms/Form/Form';
import Table from 'components/organisms/Table/Table';
import { getRandomId } from 'helpers/getRandomId';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { formatFloat } from 'helpers/formatFloat';
import Modal from 'components/organisms/Modal/Modal';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import useModal from 'hooks/useModal';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* gap: 20px; */

  p {
    text-align: center;
  }
`;

const Informations = styled.div`
  ul {
    margin: 5px 15px;
  }
`;

const InformationLists = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Main = () => {
  const [state, setState] = useLocalStorage('state', []);
  const { isOpen, handleOpenModal, handleCloseModal, setModalState } = useModal(false);
  const [editingItem, setEditingItem] = useState({});

  const addItem = (values) => {
    setState((prevState) => [...prevState, { ...values, id: getRandomId() }]);
  };

  const deleteItem = (id) => {
    setState((prevState) => prevState.filter((item) => item.id !== id));
  };

  const openEditModal = (id) => {
    setEditingItem(state.find((item) => item.id === id));
    handleOpenModal();
  };

  const editItem = (values) => {
    const editedItem = { id: editingItem.id, ...values };
    const newState = state.map((item) => (item.id === editedItem.id ? editedItem : item));
    setState(newState);
    handleCloseModal();
  };

  const getTotalValue = () => {
    const total = state.reduce(
      (acc, item) => ({
        ...acc,
        [item.currency]: formatFloat(acc[item.currency] + parseFloat(item.price)),
      }),
      { zloty: 0, euro: 0, dollar: 0 }
    );

    return `Total value: ${total.zloty}zloty, ${total.euro}euro, ${total.dollar}$`;
  };

  const getPositionsAmount = () => state.length;

  const getCategoryInformations = () => {
    const result = state.reduce((acc, item) => {
      if (!acc?.[item.category]) {
        acc[item.category] = { amount: 0 };
      }
      if (!acc[item.category]?.[item.currency]) {
        acc[item.category][item.currency] = 0;
      }

      acc[item.category].amount++;
      acc[item.category][item.currency] = acc[item.category][item.currency] + parseFloat(item.price);
      return acc;
    }, {});

    // version with empty values
    // let result = {};
    // allCategories.forEach((category) => {
    //   result[category] = state.reduce(
    //     (acc, item) => {
    //       if (item.category !== category) return acc;
    //       return { ...acc, [item.currency]: acc[item.currency] + parseFloat(item.price), amount: acc.amount + 1 };
    //     },
    //     {
    //       amount: 0,
    //       euro: 0,
    //       dollar: 0,
    //       zloty: 0,
    //     }
    //   );
    // });
    // console.log(result);
    return result;
  };

  const getInformations = () => {
    //sprobowac zrobic tablice od razu w poprzedniej
    let result = [];
    for (const [category, values] of Object.entries(getCategoryInformations())) {
      let arr = [];
      for (const [key, value] of Object.entries(values)) {
        arr.push({ key: key, value: value });
      }
      let obj = { category, arr };
      result.push(obj);
    }
    // console.log(result);
    return result;
  };

  return (
    <>
      {isOpen ? (
        <Modal title="Edit item" isOpen={isOpen} setIsOpen={setModalState}>
          <Form defaultValues={editingItem} onSubmit={editItem} />
        </Modal>
      ) : null}
      <Wrapper>
        <Form onSubmit={addItem} />
        <Informations>
          <p>{getTotalValue()}</p>
          <p>Total of all positions: {getPositionsAmount()}</p>
          <InformationLists>
            {getInformations().map((item) => (
              <MDBListGroup key={item.category}>
                <MDBListGroupItem active aria-current="true">
                  {item.category}
                </MDBListGroupItem>
                {item.arr.map(({ key, value }) => (
                  <MDBListGroupItem key={key}>
                    {key}: {value}
                  </MDBListGroupItem>
                ))}
              </MDBListGroup>
            ))}
          </InformationLists>
        </Informations>
        <Table data={state} deleteItem={deleteItem} editItem={openEditModal} />
      </Wrapper>
    </>
  );
};

export default Main;
