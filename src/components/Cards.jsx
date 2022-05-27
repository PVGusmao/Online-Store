import React from "react";
import PropTypes from "prop-types";
import styledComponents, { css } from "styled-components";
import CommerceContext from "../context/CommerceContext";
import { Link } from "react-router-dom";

class Cards extends React.Component {
  render() {
    const {
      item,
      item: { name, gallery, prices, inStock, id, brand },
    } = this.props;
    const { actualCurrency } = this.context;
    return (
      <Card data-testid="product-card">
        <Link
          className="link"
          to={{
            pathname: `/productdetail/${id}`,
            state: item,
          }}
        >
          <Image
            stock={inStock}
            src={gallery[0]}
            alt={name}
          />
          <Brand stock={inStock}>{brand}</Brand>
          <Name stock={inStock}>{name}</Name>
          <Price stock={inStock}>
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
        </Link>
          <Button stock={inStock} className="button-hover" type="button">Add to Cart</Button>
      </Card>
    );
  }
}

const Button = styledComponents.button`
  display: none;
  font-Size: 16px;
  height: 50px;
  left: 125px;
  position: relative;
  top: 75px;
  width: 100px;
  z-index: 2;

  &:hover {
    display: block;
    opacity: 1;
  }
`

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
  height: auto;
  position: absolute;
  width: 356px;

  ${(props) => {
    switch(!props.stock) {
      case true:
        return css`
          opacity: 0.3;
        `
      default:
        return css`
        opacity: 1;
      `
    }
  }}
`;

const Brand = styledComponents.h4`
  font-Size: 20px;
  position: relative;
  top: 85%;

  ${(props) => {
    switch(!props.stock) {
      case true:
        return css`
          opacity: 0.3;
        `
      default:
        return css`
        opacity: 1;
      `
    }
  }} 
`;

const Name = styledComponents.h4`
  font-Size: 20px;
  position: relative;
  top: 85%;

  ${(props) => {
    switch(!props.stock) {
      case true:
        return css`
          opacity: 0.3;
        `
      default:
        return css`
        opacity: 1;
      `
    }
  }} 
`;

const Price = styledComponents.h5`
  bottom: 0%;
  font-Size: 18px;
  position: relative;
  top: 85%;

  ${(props) => {
    switch(!props.stock) {
      case true:
        return css`
          opacity: 0.3;
        `
      default:
        return css`
        opacity: 1;
      `
    }
  }}
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
