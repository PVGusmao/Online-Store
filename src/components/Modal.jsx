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
          <SectionTitle>My Bag, { cart.length } {cart.length === 1 ? 'item' : 'items'}.</SectionTitle>
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
          <PriceWrapper>
            <SectionTitle>
              Total
            </SectionTitle>
            <SectionTitle>
              {
                this.handleTotalPrice()
              }
          </SectionTitle>
          </PriceWrapper>
          <ButtonWrapper>
            <Button context="viewBag">VIEW BAG</Button>
            <Button context="checkOut">CHECK OUT</Button>
          </ButtonWrapper>
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
  width: 370px;
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
  height: 450px; 
  overflow-y: auto;
`;

const ModalFooter = styledComponents.footer`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
`;

const ButtonWrapper = styledComponents.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  width: 100%;
`

const PriceWrapper = styledComponents.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Button = styledComponents.button`
  ${(props) => {
    switch(props.context) {
      case 'viewBag':
        return css`
          align-items: center;
          background: #FFFFFF;
          border: 1px solid #1D1F22;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          font-family: 'Raleway';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          height: 43px;
          justify-content: center;
          left: 0px;
          line-height: 120%;
          padding: 16px 32px;
          position: static;
          width: 160px;
          top: 0px;
        `;
      default:
        return css`
          align-items: center;
          background: #5ECE7B;
          border: none;
          cursor: pointer;
          color: #FFFFFF;
          display: flex;
          flex-direction: column;
          font-family: 'Raleway';
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          height: 43px;
          justify-content: center;
          left: 0px;
          line-height: 120%;
          padding: 16px 32px;
          position: static;
          width: 160px;
          top: 0px;
        `;
    }
  }} 
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