import React from 'react';
import Header from '../components/Header';
import DetailCard from '../components/DetailCard';
import Modal from '../components/Modal';
import styledComponents from 'styled-components';
import CommerceContext from '../context/CommerceContext';

class ProductDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      details: [],
    }
  }

  componentDidMount() {
    const { location: { state } } = this.props;
    this.setState({
      details: state,
    })
  }

  render() {
    const { details } = this.state;
    const { showModal, handleModal } = this.context;
    return (
      <>
        <Header />
        {
          showModal && <Modal showModal={ showModal } />
        }
        {
          showModal && (<Shadow onClick={ handleModal } />)
        }
        <DetailCard details={ details } />
      </>
    );
  }
}

const Shadow = styledComponents.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

ProductDetail.contextType = CommerceContext;
export default ProductDetail;
