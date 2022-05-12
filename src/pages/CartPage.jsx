import React from "react";
import CommerceContext from "../context/CommerceContext";
import styledComponents from "styled-components";
import CardList from "../components/CardList";
import Header from "../components/Header";

class CartPage extends React.Component {
  handleTotalPrice = () => {
    const { cart, actualCurrency, currency } = this.context;
    const symbol =
      currency.length &&
      currency.find((currency) => currency.label === actualCurrency).symbol;
    const value = cart.map(
      (item) =>
        item.prices.find((price) => price.currency.label === actualCurrency)
          .amount * item.quantity
    );
    const totalValue = value.length && value.reduce((acc, curr) => acc + curr);
    return `${symbol} ${totalValue.toFixed(2)}`;
  };

  render() {
    const { cart, showModal, handleModal } = this.context;
    return (
      <>
        <Header props={this.props} />
      {
        showModal && (<Shadow onClick={ handleModal } />)
      }
        <CartExternalWrapper>
          <SectionWrapper>
            <Title>Cart</Title>
          </SectionWrapper>
          {cart.map((element, index) => (
            <CardWrapper key={index}>
              <CardList element={element} />
            </CardWrapper>
          ))}
          <Footer>
            <Tax>
              Tax 21%:
              <p style={{ fontWeight: "bold" }}>
                {`${this.handleTotalPrice().split(" ")[0]} ${
                  Math.round(+this.handleTotalPrice().split(" ")[1] * 21) / 100
                }`}
              </p>
            </Tax>
            <Quantity>
              Quantity:
              <p style={{ fontWeight: "bold" }}>{`${cart.length}`}</p>
            </Quantity>
            <Total>
              Total:{" "}
              <p style={{ fontWeight: "bold" }}>{`${this.handleTotalPrice()}`}</p>
            </Total>
            <Order>ORDER</Order>
          </Footer>
        </CartExternalWrapper>
      </>
    );
  }
}

const Order = styledComponents.button`
  align-items: center;
  background: #5ECE7B;
  border: none;
  color: #FFFFFF;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  height: 43px;
  justify-content: center;
  left: 0px;
  line-height: 120%;
  margin: 16px 0px;
  order: 1;
  padding: 16px 32px;
  position: static;
  top: 116px;
  width: 279px;

  &:active {
    background: darkgreen;

  }
`;

const Total = styledComponents.div`
  color: #1D1F22;
  display: flex;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  height: 28px;
  left: 0px;
  line-height: 28px;
  margin: 8px 0px;
  order: 0;
  position: static;
  top: 0px;
  width: auto;
`;

const Quantity = styledComponents.div`
  color: #1D1F22;
  display: flex;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  height: 28px;
  left: 0px;
  line-height: 28px;
  margin: 8px 0px;
  order: 0;
  position: static;
  top: 0px;
  width: auto;
`;

const Tax = styledComponents.div`
  color: #1D1F22;
  display: flex;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  height: 28px;
  left: 0px;
  line-height: 28px;
  margin: 8px 0px;
  order: 0;
  position: static;
  top: 0px;
  width: auto;
`;

const CartExternalWrapper = styledComponents.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const SectionWrapper = styledComponents.section`
  border-bottom: 1px solid rgba(0, 0, 0, 0.200);
  display: flex;
  flex-direction: column;
  height: 160px;
  justify-content: center;
  width: 85%;
`;

const CardWrapper = styledComponents.section`
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.200);
  display: flex;
  height: 336px;
  justify-content: space-between;
  width: 85%;
`;

const Title = styledComponents.h1`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  width: 100px; 
`;

const Footer = styledComponents.section`
  width: 85%;
`;

const Shadow = styledComponents.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

CartPage.contextType = CommerceContext;
export default CartPage;
