import React from "react";
import styledComponents, { css } from "styled-components";
import CommerceContext from '../context/CommerceContext';
import ShoppingCard from "./ShoppingCard";

class Modal extends React.Component {
  handleTotalPrice = () => {
    const { cart, actualCurrency, currency } = this.context;
    const symbol = currency.length && currency.find((currency) => currency.label === actualCurrency).symbol;
    const value = cart.map((item) => item.prices.find((price) => price.currency.label === actualCurrency).amount * item.quantity)
    const totalValue = value.length && value.reduce((acc, curr) => acc + curr);
    return `${symbol} ${totalValue.toFixed(2)}`;
  }

  render() {
    const { showModal } = this.props;
    const { cart } = this.context;
    return (
      <ModalWrapper showModal={ showModal }>
        <ModalHeader>
          <SectionTitle>My Bag, { cart.length } items.</SectionTitle>
        </ModalHeader>
        <AllCardWrapper>
          {
            cart.map((element, index) => (
              <ShoppingCard
                key={ index }
                element={ element }
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
              this.handleTotalPrice()
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
  margin-top: 755px;
  padding: 32px 16px;
  position: absolute;
  right: 72px;
  width: 325px;
  z-index: 2;

  ${(props) => {
    switch(props.showModal) {
      case true:
        return css`
          opacity: 1;
        `;
      default:
        return css`
          opacity: 0;
          pointer-events: none;
        `;
    }
  }} 
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