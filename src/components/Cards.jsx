import React from 'react';
import PropTypes from 'prop-types';
import styledComponents from 'styled-components';
import CommerceContext from '../context/CommerceContext';

const Card = styledComponents.section.attrs(() => ({ tabIndex: 0 }))`
  position: static;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 100px 50px;
  padding: 16px;
  width: 300px;

  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`;

const Image = styledComponents.img`
  height: 350px;
  width: 100%;
`;

const Name = styledComponents.h4`
  font-Size: 20px;
`;

const Price = styledComponents.h5`
font-Size: 18px;
`;

class Cards extends React.Component {
  render() {
    const { item: { name, gallery, prices } } = this.props;
    const { actualCurrency } = this.context;
    return (
      <Card>
        <Image src={ gallery[0] } alt={ name } />
        <Name>
          { name }
        </Name>
        <Price>
          {
            `${prices.find((element) => element.currency.label === actualCurrency).currency.symbol}
            ${prices.find((element) => element.currency.label === actualCurrency).amount}`
          }
        </Price>
      </Card>
    );
  }
}

Cards.propTypes = {
  name: PropTypes.string,
  gallery: PropTypes.arrayOf(PropTypes.object),
  prices: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

Cards.contextType = CommerceContext;
export default Cards;
