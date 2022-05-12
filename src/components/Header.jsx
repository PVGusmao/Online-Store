import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { css } from "styled-components";
import CommerceContext from "../context/CommerceContext";
import BACK_LINK from "../images/back.svg";
import SHOPPING_CART from "../images/shoppingCart.svg";
import Modal from "./Modal";

class Header extends React.Component {
  componentDidMount() {
    const { handleCompleteAPI } = this.context;
    handleCompleteAPI();
  }

  handleClick = () => {
    const { props: { history } } = this.props;
    history.goBack();
  }

  render() {
    const {
      actualCurrency,
      cart,
      categorySelected,
      currency,
      data,
      handleChangeCategory,
      handleChangeCurrency,
      handleModal,
      showModal,
    } = this.context;

    return (
      <Head>
        <Nav>
          {data.length !== 0 &&
            data.data.categories.map((element, index) => (
              <Button categorySelected={categorySelected}
                style={{
                  color:
                    categorySelected === element.name ? "#5ece7b" : "black",
                  borderBottom:
                    categorySelected === element.name
                      ? "2px solid #5ece7b"
                      : "0px solid #5ece7b",
                }}
                onClick={(e) => handleChangeCategory(e)}
                name={element.name}
                key={index}
              >
                {element.name.toUpperCase()}
              </Button>
            ))}
        </Nav>
          <ButtonBack onClick={this.handleClick}>
            <ImageBack  src={BACK_LINK} alt="Back Icon" />
          </ButtonBack>
        <WrapperCartCurrency>
          <CurrencySelect
            onChange={(e) => handleChangeCurrency(e)}
            name="currency"
            id="currency"
            value={actualCurrency}
          >
            {currency.map((element, index) => (
              <CurrencyOptions value={element.label} key={index}>
                {`${element.symbol} ${element.label}`}
              </CurrencyOptions>
            ))}
          </CurrencySelect>
          <ButtonCart onClick={handleModal}>
            <QuantityCartIndicator quantity={cart.length}>{ cart.length }</QuantityCartIndicator>
            <ImageCart src={SHOPPING_CART} alt="Shopping Cart Icon" />
          </ButtonCart>
          <Modal props={this.props.props} showModal={showModal} />
        </WrapperCartCurrency>
      </Head>
    );
  }
}

const Head = styled.header`
  align-items: center;
  display: flex;
  height: 80px;
  justify-content: space-between;
  width: 100%;
`;

const Nav = styled.nav`
  align-items: center;
  color: white;
  display: flex;
  height: 100%;
  justify-content: space-evenly;
  margin: 10px;
  width: 300px;
`;

const Button = styled.button.attrs(() => ({ tabIndex: 0 }))`
  align-items: center;
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  height: 100%;
  outline: inherit;
  padding: 0;

  &:hover {
    color: #5ece7b;
    border-bottom: 2px solid #5ece7b;
  }
`;

const WrapperCartCurrency = styled.section`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-right: 100px;
  position: relative;
  width: 150px;
`;

const CurrencySelect = styled.select`
  -moz-appearance: none;
  -ms-appearance: none;
  background-color: white;
  border: none;
  height: 30px;
  width: auto;
`;

const CurrencyOptions = styled.option`
  text-size: 20px;
`;

const ImageCart = styled.img`
  cursor: pointer;
  width: 32px;
`;

const ImageBack = styled.img`
  cursor: pointer;
  height: 100%;
  position: relative;
  width: 100%;
`;

const ButtonBack = styled.button`
  background: none;
	color: inherit;
	cursor: pointer;
	border: none;
	padding: 0;
	font: inherit;
	outline: inherit;
  height: 42px;
  position: relative;
  width: 48px;
`;

const QuantityCartIndicator = styled.div`
  align-items: center;
  background: black;
  border-radius: 50px;
  color: white;
  display: flex;
  font-size: 16px;
  height: 20px;
  justify-content: center;
  position: absolute;
  right: 0;
  width: 20px;

  ${(props) => {
    switch(+props.quantity) {
      case 0:
        return css`
          opacity: 0;
          pointer-events: none;
        `;
      default:
        return css`
          opacity: 1;
        `;
    }
  }}
`

const ButtonCart = styled.button`
  background: none;
  border: none;
  color: black;
  cursor: pointer;
  height: 100%;
  margin-right: 10px;
  outline: inherit;
  padding: 0;
`;

Header.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

Header.contextType = CommerceContext;
export default Header;
