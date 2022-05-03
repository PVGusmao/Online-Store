import React from "react";
import styledComponents from "styled-components";
import CommerceContext from '../context/CommerceContext';
import '../assets/modal.css';

const ModalWrapper = styledComponents.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 677px;
  right: 72px;
  padding: 32px 16px;
  position: absolute;
  width: 325px;
  z-index: 2; 
`;

const ModalHeader = styledComponents.header`

`;

const ModalContent = styledComponents.main`

`;

const DisplayItems = styledComponents.section`

`

const ModalFooter = styledComponents.footer`

`;

const SectionTitle = styledComponents.h3`
  color: #1D1F22;
  flex-grow: 0;
  flex: none;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  order: 0;
  text-align: left;
`;

class Modal extends React.Component {
  render() {
    const { cart } = this.context;
    return (
      <ModalWrapper className="modal">
        <ModalHeader>
          <SectionTitle>My Bag, { cart.length } items.</SectionTitle>
        </ModalHeader>
        <ModalContent>
        <SectionTitle>
          Content
        </SectionTitle>
        </ModalContent>
        <ModalFooter>
          <SectionTitle>
            Footer
          </SectionTitle>
        </ModalFooter>
      </ModalWrapper>
    )
  }
}

Modal.contextType = CommerceContext;
export default Modal;