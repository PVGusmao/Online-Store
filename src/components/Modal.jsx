import React from "react";
import styledComponents from "styled-components";
import CommerceContext from '../context/CommerceContext';
import ShoppingCard from "./ShoppingCard";

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

class Modal extends React.Component {
  render() {
    const { cart, actualCurrency } = this.context;
    return (
      <ModalWrapper>
        <ModalHeader>
          <SectionTitle>My Bag, { cart.length } items.</SectionTitle>
        </ModalHeader>
        <AllCardWrapper>
          {
            cart.map((element, index) => (
              <ShoppingCard key={ index } element={ element } />
            ))
          }
        </AllCardWrapper>
        <ModalFooter>
          <SectionTitle>
            Total
          </SectionTitle>
          <SectionTitle>
            { 
              cart.length > 0 && 
              `${cart.map((element) => element.prices
                .find((item) => item.currency.label === actualCurrency))[0].currency.symbol}
              ${(cart.map((element) => element.prices
                  .find((item) => item.currency.label === actualCurrency)).length === 1
                ? (cart.map((element) => element.prices
                  .find((item) => item.currency.label === actualCurrency))[0].amount)
                : (cart.map((element) => element.prices
                  .find((item) => item.currency.label === actualCurrency))
                  .reduce((acc, curr) => acc.amount + curr.amount)).toFixed(2)
                )}` 
            }
          </SectionTitle>
        </ModalFooter>
      </ModalWrapper>
    )
  }
}

Modal.contextType = CommerceContext;
export default Modal;