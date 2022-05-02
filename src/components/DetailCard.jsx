import React from 'react';
import PropTypes from 'prop-types';
import styledComponents from 'styled-components';
import CommerceContext from '../context/CommerceContext';
import { css } from 'styled-components';

const Wrapper = styledComponents.section`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 40px 0px;
  width: 100%;
`;

const ImageOptions = styledComponents.section`
  height: 800px;
  margin: 0px 30px;
  width: 100px;
`;

const ImageOptionsItem = styledComponents.section`
  cursor: pointer;
  height: 100px;
  margin-bottom: 15px;
  width: 100px;
  ${(props) => {
    return css`
      background-image: url(${props.name});
      background-size: cover;
    `
  }} 
`;

const ImageSelected = styledComponents.section`
  height: 700px;
  width: 700px;

  ${(props) => {
    return css`
      background-image: url(${props.name === '' ? props.id : props.name});
      background-size: 100% 100%;
    `
  }} 
`;

const Description = styledComponents.section`
  height: 800px;
  margin-left: 20px;
  width: 300px;
`;

const Name = styledComponents.p`
  font-weight: 600;
  font-size: 30px;
  line-height: 27px;
`;

const Brand = styledComponents.p`
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  margin-bottom: 43px;
  margin-top: 16px;
`;

const AttributesWrapper = styledComponents.section`
  
`;

const AttributeTitle = styledComponents.p`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  padding-bottom: 8px;
`;

const AttributeList = styledComponents.div`
  align-items: center;
  display: flex;
  height: auto;
  margin-bottom: 24px;
  width: auto;
`;

const AttributeItems = styledComponents.button`
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  height: 45px;
  margin-right: 10px;
  margin-bottom: 24px;
  padding: 10px;
  width: 63px;
`;

const PriceWrapper = styledComponents.section`

`

const PriceTitle = styledComponents.p`
  font-family: 'Roboto Condensed';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18px;
`

const PriceValue = styledComponents.p`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  height: 46px;
  line-height: 18px;
  margin-top: 10px;
  width: 90px;
`

const ButtomAddToCart = styledComponents.button.attrs(() => ({ tabIndex: 0 }))`
  align-items: center;
  background-color: #5ECE7B;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: 'Raleway';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 120%;
  height: 52px;
  left: 929px;
  padding: 16px 32px;
  top: 560px;
  width: 292px;

  &:active {
    background-color: #56bf71;
  }
`;

const DetailsAbout = styledComponents.p`
  bottom: 178px;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  height: 103px;
  left: calc(50% - 292px/2 + 355px);
  line-height: 159.96%;
  margin-top: 40px;
  overflow-y: auto;
  width: 292px;
`;

class DetailCard extends React.Component {
  constructor() {
    super();

    this.state = {
      clickedImage: '',
    }
  }

  handleImage = (element) => {
    this.setState({
      clickedImage: element,
    })
  }

  handleAttributes = ({ target }) => {
    const attributesOptions = target.closest('div').childNodes;
    attributesOptions.forEach((element) => (
      element.classList.remove('selected-attribute', 'selected-attribute-color')
    ))
    if (target.id === 'color') {
      target.classList.add('selected-attribute-color')
    } else {
      target.classList.add('selected-attribute');
    }
  }

  render() {
    const { clickedImage } = this.state;
    const { actualCurrency } = this.context;
    const { details: { attributes, prices, name, inStock,
      gallery, description, brand } } = this.props;

    return (
      <Wrapper>
        <ImageOptions>
          {
            gallery && gallery.map((element, index) => (
              <ImageOptionsItem
                className="images"
                onClick={() => this.handleImage(element) }
                id={ element }
                key={ index }
                name={ element }
              />
            ))
          }
        </ImageOptions>
        <ImageSelected
          id={ gallery && gallery[0] }
          name={ clickedImage }
        />
        <Description>
          <Name>{ name }</Name>
          <Brand>{ brand }</Brand>
          {
            attributes && attributes.map((element, ind) => (
              <AttributesWrapper key={ ind }>
                <AttributeTitle>{ element.name.toUpperCase() }: </AttributeTitle>
                  <AttributeList>
                    {
                      element.items.map((items, index) => (
                        <AttributeItems
                          style={{
                            backgroundColor: element.name.toLowerCase() === 'color' && items.value
                          }}
                          className="attribute-item"
                          key={ index }
                          id={ element.id.toLowerCase() }
                          onClick={ this.handleAttributes}
                        >
                          { element.name.toLowerCase() === 'color' ? '' : items.value }
                        </AttributeItems>
                      ))
                    }
                  </AttributeList>
              </AttributesWrapper>
            ))
          }
          <PriceWrapper>
            <PriceTitle>PRICE: </PriceTitle>
            <PriceValue>
              {
                prices && `${prices.find((element) => element.currency.label === actualCurrency).currency.symbol}
                  ${prices.find((element) => element.currency.label === actualCurrency).amount}`
              }
            </PriceValue>
          </PriceWrapper>
          <ButtomAddToCart>
            ADD TO CART
          </ButtomAddToCart>
          <DetailsAbout dangerouslySetInnerHTML={{ __html: description }} />
        </Description>
      </Wrapper>
    );
  }
}

DetailCard.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object),
  prices: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  inStock: PropTypes.bool,
  gallery: PropTypes.arrayOf(PropTypes.string),
  description: PropTypes.string,
  category: PropTypes.string,
}.isRequired;

DetailCard.contextType = CommerceContext;
export default DetailCard;
