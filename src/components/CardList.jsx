import React from "react";
import styledComponents, { css } from "styled-components";
import CommerceContext from "../context/CommerceContext";
import backButton from "../images/backButton.svg";
import forwardButton from "../images/forwardButton.svg";

class CardList extends React.Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
    }
  }

  handleClick = ({ target }) => {
    const { element: { gallery } } = this.props;
    if (target.alt === 'next') {
      this.setState((prevState) => ({
        counter: prevState.counter === gallery.length - 1 ? 0 : prevState.counter + 1,
      }))
    } else {
      this.setState((prevState) => ({
        counter: prevState.counter === 0 ? gallery.length - 1 : prevState.counter - 1,
      }))
    }
  }

  render() {
    const { counter } = this.state;
    const { element } = this.props;
    const { actualCurrency, handleQuantity, handleRemoveItem } = this.context;
    return (
      <>
        <ContentDetails>
        <Name>{element.name}</Name>
        <Brand>{element.brand}</Brand>
        <Price className="price-tag">
          {`${
            element.prices.find(
              (item) => item.currency.label === actualCurrency
            ).currency.symbol
          }
              ${(
                element.prices.find(
                  (item) => item.currency.label === actualCurrency
                ).amount * element.quantity
              ).toFixed(2)}`}
        </Price>
        <ExternalAttributeDiv>
          {element.attributes.map((value, ind) => (
            <div key={ind}>
              <AttributeTit>{value.name.toUpperCase()}: </AttributeTit>
              <AttributeList>
                {value.items.map((items, index) => (
                  <AttributeItems
                    style={{
                      backgroundColor:
                        value.name.toLowerCase() === "color" && items.value,
                    }}
                    className={
                      value.name.toLowerCase() === "color" &&
                      Object.values(element.selectedAttribute).includes(
                        items.value
                      )
                        ? "selected-attribute-color"
                        : Object.values(element.selectedAttribute).includes(
                            items.value
                          ) && "selected-attribute"
                    }
                    key={index}
                    name={items.value}
                    id={
                      value.id.toLowerCase().split(" ")[
                        value.id.toLowerCase().split(" ").length - 1
                      ]
                    }
                    onClick={this.handleAttributes}
                  >
                    {value.name.toLowerCase() === "color" ? "" : items.value}
                  </AttributeItems>
                ))}
              </AttributeList>
            </div>
          ))}
        </ExternalAttributeDiv>
        </ContentDetails>
        <QuantityController>
          <PlusMinusButtomWrapper>
            <Plus
              id="plus"
              value={element.id}
              onClick={({ target }) => handleQuantity(target)}
              className="plus"
              >
              +
            </Plus>
            <Quantity>{element.quantity}</Quantity>
            <Minus
              id="minus"
              value={element.id}
              onClick={({ target }) => handleQuantity(target)}
              className="minus"
              >
              -
            </Minus>
          </PlusMinusButtomWrapper>
          <ImageChangerWrapper>
            <Image name={element.gallery[counter]} />
            <ImageChangerBack
              onClick={ this.handleClick }
              src={ backButton }
              alt="previous"
            />
            <ImageChangerForward
              onClick={ this.handleClick }
              src={ forwardButton }
              alt="next"
            />
          </ImageChangerWrapper>
          <RemoveWrapper>
            <Remove id={ element.id } onClick={ handleRemoveItem } type="button">X</Remove>
          </RemoveWrapper>
        </QuantityController>
      </>
    );
  }
}

const RemoveWrapper = styledComponents.div`
  height: 100%;
`

const Remove = styledComponents.button`
  background: none;
	border: 1px solid black;
	cursor: pointer;
	color: inherit;
	font-family: 'Raleway';
  font-size: 20px;
  height: 45px;
  margin-right: 10px;
  margin-top: 5px;
	outline: inherit;
	padding: 12px;
  width: 45px;

  &:active {
    background: black;
    color: white;
  }
`

const ExternalAttributeDiv = styledComponents.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
`

const ImageChangerWrapper = styledComponents.div`
  display: flex;
  position: relative;
  bottom: 0;
  width: 300px;
`
const ImageChangerBack = styledComponents.img`
  bottom: 10px;
  cursor: pointer;
  margin: 2px;
  position: absolute;
  right: 50px;
`
const ImageChangerForward = styledComponents.img`
  bottom: 10px;
  cursor: pointer;
  margin: 2px;
  position: absolute;
  right: 20px;
`

const PlusMinusButtomWrapper = styledComponents.div`
  margin: 0px 20px ; 
  height: 100%;
`

const ContentDetails = styledComponents.section`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 200px;
`;

const Name = styledComponents.p`
  align-items: center;
  color: #1D1F22;
  display: flex;
  font-family: 'Raleway';
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
  height: 27px;
  left: 101px;
  line-height: 27px;
  top: 280px;
  width: 350px;
`;

const Brand = styledComponents.p`
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  width: 100%;
`;

const Price = styledComponents.p`
  align-items: center;
  color: #1D1F22;
  display: flex;
  font-family: 'Raleway';
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  height: 24px;
  left: 100px;
  line-height: 24px;
  top: 370px;
  width: 100%;
`;

const AttributeItems = styledComponents.div`
  align-items: center;
  background: #FFFFFF;
  border: 1px solid #1D1F22;
  cursor: pointer;
  display: flex;
  height: 45px;
  justify-content: center;
  left: 0px;
  margin: 10px;
  top: 0px;
  width: 63px;

  ${(props) => {
    switch (props.id) {
      case "color":
        return css`
          height: 36px;
          width: 36px;
        `;
      default:
        return css`
          height: 42px;
          width: 52px;
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

const AttributeTit = styledComponents.div`
  align-items: center;
  color: #1D1F22;
  display: flex;
  flex: none;
  flex-grow: 0;
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-size: 18px;
  font-weight: 700;
  height: auto;
  line-height: 18px;
  text-align: center;
  width: 320px;
`;

const QuantityController = styledComponents.div`
  align-items: center;
  display: flex;
  height: 100%;
  width: 430px; 
`;

const Plus = styledComponents.button`
  align-items: center;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  font-size: 30px;
  display: flex;
  height: 45px;
  justify-content: center;
  margin-top: 20px;
  width: 45px;
	outline: inherit;
  
  &:active {
    background: green;
    color: white;
  }
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
  font-size: 24px;
  justify-content: center;
  left: 33.33%;
  line-height: 160%;
  margin: 80px 0px;
  order: 1;
  position: static;
  right: 33.33%;
  text-align: right;
  top: 43.16%;
`;

const Minus = styledComponents.button`
  align-items: center;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  font-size: 30px;
  display: flex;
  height: 45px;
  justify-content: center;
  width: 45px;
	outline: inherit;

  &:active {
    background: red;
    color: white;
  }
`;

const Image = styledComponents.div`
  border: 1px solid rgba(0, 0, 0, 0.020);
  height: 300px;
  margin-right: 10px;
  position: relative;
  width: 300px;

  ${(props) => {
    return css`
      background-image: url(${props.name});
      background-size: 100% 100%;
    `;
  }}
`;

CardList.contextType = CommerceContext;
export default CardList;
