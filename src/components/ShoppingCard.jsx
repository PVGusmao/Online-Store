import React from 'react';
import PropTypes from 'prop-types';
import styledComponents, { css } from 'styled-components';
import CommerceContext from '../context/CommerceContext';

const CardWrapper = styledComponents.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const ContentDetails = styledComponents.section`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Name = styledComponents.p`
  align-items: center;
  display: flex;
  color: #1D1F22;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 160%;
  margin: 4px 0px;
  order: 0;
`;

const Price = styledComponents.p`
  color: #1D1F22;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 160%;
  margin: 4px 0px;
  order: 1;
  text-align: left;
`;

const AttributeItems = styledComponents.div`
  align-items: center;
  border: 1px solid #1D1F22;
  color: #1D1F22;
  cursor: pointer;
  display: flex;
  font-family: 'Source Sans Pro';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  justify-content: center;
  line-height: 160%;
  margin: 0px 5px;
  padding: 5px;

  ${(props) => {
    switch(props.id) {
      case 'color':
        return css`
          height: 16px;
          width: 16px;
        `;
      default:
        return css`
        height: 24px;
        width: auto;
        `;
    }
  }} 
`;

const AttributeList = styledComponents.div`
  align-items: center;
  display: flex;
  height: auto;
  width: auto;
`;

const AttributeTitle = styledComponents.div`
  align-items: center;
  color: #1D1F22;
  display: flex;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  margin: 8px 0px;
  order: 0;
`;

const QuantityController = styledComponents.div`
  padding-left: 5px
`;

const Plus = styledComponents.div`
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
`;

const Quantity = styledComponents.p`
  bottom: 43.16%;
  color: #1D1F22;
  display: flex;
  flex: none;
  flex-grow: 0;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  justify-content: center;
  left: 33.33%;
  line-height: 160%;
  margin: 32px 0px;
  order: 1;
  position: static;
  right: 33.33%;
  text-align: right;
  top: 43.16%;
`;

const Minus = styledComponents.div`
  align-items: center;
  border: 1px solid black;
  cursor: pointer;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  height: 24px;
  justify-content: center;
  width: 24px;
`;

const Image = styledComponents.div`
  height: 190px;
  margin-left: 5px;
  width: 120px;

  ${(props) => {
    return css`
      background-image: url(${props.name});
      background-size: 100% 100%;
    `
  }}
`;

class ShoppingCard extends React.Component {
  constructor() {
    super();

    this.state = {
      quantity: 1,
    }
  }

  handleQuantity = ({ target }) => {
    if (target.classList.contains('plus')) {
      this.setState((prevState) => ({
        quantity: prevState.quantity + 1,
      }))
    } else {
      this.setState((prevState) => ({
        quantity: prevState.quantity === 1 ? 1 : prevState.quantity - 1,
      }))
    }
  }

  render() {
    const { element } = this.props;
    const { quantity } = this.state;
    const { actualCurrency } = this.context;
    return (
      <CardWrapper>
                <ContentDetails>
                  <Name>{ element.name }</Name>
                  <Price className="price-tag">
                    {
                      `${element.prices.find((item) => item.currency.label === actualCurrency).currency.symbol} ${(element.prices.find((item) => item.currency.label === actualCurrency).amount * quantity).toFixed(2)}`
                    }
                  </Price>
                  <div>
                    {
                      element.attributes.map((value, ind) => (
                        <div key={ ind }>
                          <AttributeTitle>{ value.name.toUpperCase() }: </AttributeTitle>
                            <AttributeList>
                              {
                                value.items.map((items, index) => (
                                  <AttributeItems
                                    style={{
                                      backgroundColor: value.name.toLowerCase() === 'color' && items.value,
                                    }}
                                    className={
                                      (value.name.toLowerCase() === 'color' && Object.values(element.selectedAttribute).includes(items.value))
                                      ? 'selected-attribute-color' : 
                                      ((Object.values(element.selectedAttribute).includes(items.value)) && 'selected-attribute')
                                    }
                                    key={ index }
                                    name={ items.value }
                                    id={ value.id.toLowerCase().split(' ')[value.id.toLowerCase().split(' ').length - 1] }
                                    onClick={ this.handleAttributes}
                                    >
                                    { value.name.toLowerCase() === 'color' ? '' : items.value }
                                  </AttributeItems>
                                ))
                              }
                            </AttributeList>
                        </div>
                      ))
                    }
                  </div>
                </ContentDetails>
                <QuantityController>
                  <Plus
                    id={ element.id }
                    onClick={ this.handleQuantity }
                    className="plus"
                  >
                    +
                  </Plus>
                    <Quantity>{ quantity }</Quantity>
                  <Minus
                    id={ element.id }
                    onClick={ this.handleQuantity }
                    className="minus"
                  >
                    -
                  </Minus>
                </QuantityController>
                <Image name={ element.gallery } />
              </CardWrapper>
    );
  }
}

ShoppingCard.propTypes = {
  element: PropTypes.instanceOf(PropTypes.object),
}.isRequired;


ShoppingCard.contextType = CommerceContext;
export default ShoppingCard;
