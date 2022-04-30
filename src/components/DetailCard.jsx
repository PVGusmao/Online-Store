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
  // background-color: rgba(125, 0, 125, 1);
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
  align-items: center;
  // background-color: rgba(0, 125, 0, 1);
  display: flex;
  height: 800px;
  justify-content: center;
  width: 700px;

  ${(props) => {
    return css`
      background-image: url(${props.name === '' ? props.id : props.name});
      background-size: 100% 100%;
    `
  }} 
`;

const Description = styledComponents.section`
  background-color: rgba(200, 0, 0, 1);
  height: 800px;
  width: 400px;
`;

class DetailCard extends React.Component {
  constructor() {
    super();

    this.state = {
      clickedImage: '',
    }
  }

  handleImage = (target, element) => {
    this.setState({
      clickedImage: element,
    })
  }

  render() {
    const { clickedImage } = this.state;
    const { details: { attributes, prices, name, inStock,
      gallery, description, category } } = this.props;
    return (
      <Wrapper>
        <ImageOptions>
          {
            gallery && gallery.map((element, index) => (
              <ImageOptionsItem
                className="images"
                onClick={({ target }) => this.handleImage(target, element) }
                id={ element }
                key={ index }
                name={ element }
              />
            ))
          }
        </ImageOptions>
        <ImageSelected id={ gallery && gallery[0] } name={ clickedImage }>

        </ImageSelected>
        <Description>

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
