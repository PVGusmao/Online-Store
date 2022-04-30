import React from 'react';
import Header from '../components/Header';
import DetailCard from '../components/DetailCard';

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
    return (
      <>
        <Header />
        <DetailCard details={ details } />
      </>
    );
  }
}

export default ProductDetail;
