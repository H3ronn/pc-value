import React, { useState } from 'react';
import { Wrapper, Informations, InformationLists, Title, ListsSection, ListHeader } from './App.styles';
import Form from 'components/organisms/Form/Form';
import Table from 'components/organisms/Table/Table';
import Modal from 'components/organisms/Modal/Modal';
import { MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import useModal from 'hooks/useModal';
import useTableData from 'hooks/useTableData';

const App = () => {
  const { tableData, setTableData, addItem, deleteItem, editItem, amount, totalValue, categoryInformation } = useTableData();
  const { isOpen, handleOpenModal, handleCloseModal, setModalState } = useModal(false);
  const [editingItem, setEditingItem] = useState({});

  const openEditModal = (id) => {
    setEditingItem(tableData.find((item) => item.id === id));
    handleOpenModal();
  };

  const handleEditItem = (values) => {
    editItem({ ...values, id: editingItem.id });
    handleCloseModal();
  };

  const getCategoriesCost = () => {
    let result = [];
    for (const [category, values] of Object.entries(categoryInformation)) {
      let costs = [];
      for (const [key, value] of Object.entries(values)) {
        costs.push({ name: key, value: value });
      }
      let obj = { category, costs };
      result.push(obj);
    }

    return result;
  };

  const values = [];
  for (let currency in totalValue) {
    values.push(
      <MDBListGroupItem key={currency}>
        {totalValue[currency]} {currency}
      </MDBListGroupItem>
    );
  }

  return (
    <>
      {isOpen ? (
        <Modal title="Edit item" isOpen={isOpen} setIsOpen={setModalState}>
          <Form defaultValues={editingItem} onSubmit={handleEditItem} />
        </Modal>
      ) : null}
      <Wrapper>
        <Title>Check the value of your computer workstation!</Title>
        <Form onSubmit={addItem} />
        <Informations>
          <hr />
          <ListsSection>
            <ListHeader>Added items: {amount}</ListHeader>
            <InformationLists>
              <MDBListGroup>
                <MDBListGroupItem active aria-current="true">
                  Total value
                </MDBListGroupItem>
                {values}
              </MDBListGroup>
            </InformationLists>
          </ListsSection>

          <ListsSection>
            <ListHeader>Value of individual categories</ListHeader>
            <InformationLists>
              {getCategoriesCost().map(({ category, costs }) => (
                <MDBListGroup key={category}>
                  <MDBListGroupItem active aria-current="true">
                    {category}
                  </MDBListGroupItem>
                  {costs.map(({ name, value }) => (
                    <MDBListGroupItem key={name}>
                      {name}: {value}
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              ))}
            </InformationLists>
          </ListsSection>
        </Informations>
        <Table data={tableData} updateData={setTableData} deleteItem={deleteItem} editItem={openEditModal} />
      </Wrapper>
    </>
  );
};

export default App;
