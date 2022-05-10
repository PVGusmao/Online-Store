import React from "react";
import CommerceContext from "../context/CommerceContext";
import styledComponents, { css } from "styled-components";
import CardList from "../components/CardList";

class CartPage extends React.Component {
  render() {
    const { cart } = this.context;
    return (
      <CartExternalWrapper>
        <SectionWrapper>
          <Title>Cart</Title>
        </SectionWrapper>
        {
          cart.map((element, index) => (
            <CardWrapper key={index}>
              <CardList element={element} />
            </CardWrapper>
          ))
        }
      </CartExternalWrapper>
    )
  }
}

const CartExternalWrapper = styledComponents.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`

const SectionWrapper = styledComponents.section`
  border-bottom: 1px solid rgba(0, 0, 0, 0.200);
  display: flex;
  flex-direction: column;
  height: 160px;
  justify-content: center;
  width: 85%;
`

const CardWrapper = styledComponents.section`
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.200);
  display: flex;
  height: 336px;
  justify-content: space-between;
  width: 85%;
`

const Title = styledComponents.h1`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  width: 100px; 
`

CartPage.contextType = CommerceContext;
export default CartPage;
