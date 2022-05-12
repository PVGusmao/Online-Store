import React from "react";
import PropTypes from "prop-types";
import styledComponents from "styled-components";
import CommerceContext from "../context/CommerceContext";
import { Link } from "react-router-dom";

class Cards extends React.Component {
  render() {
    const {
      item,
      item: { name, gallery, prices, inStock, id },
    } = this.props;
    const { actualCurrency } = this.context;
    return (
      <Card>
        <Link
          to={{
            pathname: inStock ? `/productdetail/${id}` : "/",
            state: item,
          }}
        >
          <Image
            style={{ opacity: !inStock ? 0.3 : 1 }}
            src={gallery[0]}
            alt={name}
          />
        </Link>
        <Name style={{ opacity: !inStock ? 0.3 : 1 }}>{name}</Name>
        <Price style={{ opacity: !inStock ? 0.3 : 1 }}>
          {`${
            prices.find((element) => element.currency.label === actualCurrency)
              .currency.symbol
          }
            ${
              prices.find(
                (element) => element.currency.label === actualCurrency
              ).amount
            }`}
        </Price>
        {!inStock && <OutOfStock>OUT OF STOCK</OutOfStock>}
      </Card>
    );
  }
}

const Card = styledComponents.section.attrs(() => ({ tabIndex: 0 }))`
  border: 1px solid rgba(0, 0, 0, 0.03);
  bottom: 0;
  cursor: pointer;
  height: 450px;
  left: 0;
  margin: 75px 50px;
  padding: 16px;
  position: static;
  right: 0;
  top: 0;
  width: 400px;

  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
`;

const Image = styledComponents.img`
  height: 338px;
  position: absolute;
  width: 356px;
`;

const Name = styledComponents.h4`
  font-Size: 20px;
  position: relative;
  top: 85%;
`;

const Price = styledComponents.h5`
  bottom: 0%;
  font-Size: 18px;
  position: relative;
  top: 85%;
`;

const OutOfStock = styledComponents.h2`
  left: 25%;
  position: relative;
  top: 25%;
  z-index: 1;
`;

Cards.propTypes = {
  name: PropTypes.string,
  gallery: PropTypes.arrayOf(PropTypes.object),
  prices: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

Cards.contextType = CommerceContext;
export default Cards;
