import React from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody } from 'mdb-react-ui-kit';

const Modal = ({ isOpen, setIsOpen, children, title }) => {
  const toggleShow = () => setIsOpen(!isOpen);

  return (
    <MDBModal show={isOpen} setShow={setIsOpen}>
      <MDBModalDialog centered size="lg">
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>{title}</MDBModalTitle>
            <MDBBtn className="btn-close" color="none" onClick={toggleShow}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>{children}</MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default Modal;
