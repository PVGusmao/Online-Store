import React from 'react';
import styled from 'styled-components';
import CommerceContext from '../context/CommerceContext';

const URL_CART = "https://img.icons8.com/external-good-lines-kalash/32/000000/external-cart-marketing-and-digital-marketing-good-lines-kalash.png";

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
  width: 150px;
`;

const CurrencySelect = styled.select`
  -moz-appearance: none;
  -ms-appearance: none;
  border:none;
  height: 30px;
  width: auto;
`;

const CurrencyOptions = styled.option`
  text-size: 20px;
`;

const Image = styled.img`
  cursor: pointer;
`;

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

class Header extends React.Component {
  componentDidMount() {
    const { handleCompleteAPI } = this.context;
    handleCompleteAPI();
  }

  render() {
    const { data, currency, handleModal,
      handleChangeCategory, handleChangeCurrency } = this.context;
    return (
      <Head>
        <Nav>
          {
            data.length !== 0 && data.data.categories.map((element, index) => (
              <Button onClick={ (e) => handleChangeCategory(e) } name={ element.name } key={ index }>
                { element.name.toUpperCase() }
              </Button>
            ))
          }
        </Nav>
        <WrapperCartCurrency>
          <CurrencySelect
            onChange={ (e) => handleChangeCurrency(e) }
            name="currency"
            id="currency">
            {
              currency.map((element, index) => (
                <CurrencyOptions
                  value={ element.label }
                  key={ index }
                >
                  { `${ element.symbol } ${ element.label }` }
                </CurrencyOptions>
              ))
            }
          </CurrencySelect>
          <ButtonCart onClick={ handleModal }>
            <Image src={ URL_CART } alt="Shopping Cart Icon"/>
          </ButtonCart>
        </WrapperCartCurrency>
      </Head>
    );
  }
}

Header.contextType = CommerceContext;
export default Header;
