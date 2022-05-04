import React from 'react';
import PropTypes from 'prop-types';
import CommerceContext from './CommerceContext';
import { fetchCurrency, fetchData } from '../services/api';

class CommerceProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      currency: [],
      actualCurrency: 'USD',
      categorySelected: 'all',
      products: [],
      showModal: false,
      cart: [],
      counter: 0,
      total: 0,
      currencyfactor: 1,
      applyFactor: false,
    }
  }

  handleApplyFactor = () => {
    this.setState((prev) => ({
      applyFactor: !prev.applyFactor,
    }))
  }

  handleTotal = (total) => {
    this.setState({
      total,
    })
  }

  handleCounter = () => {
    this.setState((prevState) => ({
      counter: prevState.counter + 1,
    }))
  }

  handleAddCart = (card) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, card],
    }));
  }

  handleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }))
  }

  handleCompleteAPI = async () => {
    const data = await fetchData();
    const currency = await fetchCurrency();
    this.setState({
      data,
      currency,
      products: data.data.categories,
    });
  }

  handleChangeCurrency = ({ target }) => {
    const { products, applyFactor, actualCurrency, currencyfactor } = this.state;
    this.setState((prev) => ({
      actualCurrency: target.value,
      currencyfactor: (products[0].products[0].prices.find((item) => item.currency.label === target.value).amount) /
      (products[0].products[0].prices.find((item) => item.currency.label === prev.actualCurrency).amount),
    }))
    !applyFactor && this.handleApplyFactor();
  }

  handleChangeCategory = ({ target }) => {
    this.setState({
      categorySelected: target.name,
    })
  }
  
  render() {
    const { Provider } = CommerceContext;
    const { children } = this.props;
      return (
        <Provider
          value={ {
            ...this.state,
            handleCompleteAPI: this.handleCompleteAPI,
            handleChangeCategory: this.handleChangeCategory,
            handleChangeCurrency: this.handleChangeCurrency,
            handleModal: this.handleModal,
            handleAddCart: this.handleAddCart,
            handleCounter: this.handleCounter,
            handleTotal: this.handleTotal,
            handleApplyFactor: this.handleApplyFactor,
          } }
        >
          {children}
        </Provider>
      );
  }
}

CommerceProvider.propTypes = {
  children: PropTypes.instanceOf(PropTypes.object),
}.isRequired;

export default CommerceProvider;
