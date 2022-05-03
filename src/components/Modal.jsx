import React from "react";
import styledComponents from "styled-components";
import CommerceContext from '../context/CommerceContext';
import ShoppingCard from "./ShoppingCard";

class Modal extends React.Component {
  render() {
    const { cart, actualCurrency, total, currency } = this.context;
    return (
      <ModalWrapper>
        <ModalHeader>
          <SectionTitle>My Bag, { cart.length } items.</SectionTitle>
        </ModalHeader>
        <AllCardWrapper>
          {
            cart.map((element, index) => (
              <ShoppingCard
                key={ index }
                element={ element }
                handleTotal={ this.handleTotal }
              />
            ))
          }
        </AllCardWrapper>
        <ModalFooter>
          <SectionTitle>
            Total
          </SectionTitle>
          <SectionTitle>
            { 
              total.length === 0
              ? 0
              : `${currency.find((element) => element.label === actualCurrency).symbol} 
                ${Object.values(total).lengt && (Object.values(total)
                  .reduce((acc, curr) => +acc + +curr))}`
            }
          </SectionTitle>
        </ModalFooter>
      </ModalWrapper>
    )
  }
}

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

const AllCardWrapper = styledComponents.main`
  overflow-y: auto;
`;

const ModalFooter = styledComponents.footer`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
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


Modal.contextType = CommerceContext;
export default Modal;