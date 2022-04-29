import React from "react";
import styledComponents from "styled-components";
import CommerceContext from '../context/CommerceContext';

const ModalWrapper = styledComponents.div`
  align-items: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 677px;
  justify-content: space-between;
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

const ModalFooter = styledComponents.footer`

`;

const SectionTitle = styledComponents.h3`

`;

class Modal extends React.Component {
  render() {
    const { showModal } = this.props;
    return (
      <ModalWrapper>
        <ModalHeader>
          <SectionTitle>
            Header
          </SectionTitle>
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