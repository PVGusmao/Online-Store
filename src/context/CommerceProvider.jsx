import React from 'react';
import PropTypes from 'prop-types';
import CommerceContext from './CommerceContext';
import { fetchCurrency, fetchData } from '../services/api';

class CommerceProvider extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      currency: [],
      actualCurrency: 'USD',
      categorySelected: 'all',
      products: [],
      showModal: false,
      cart: [],
      counter: 0,
    }
  }

  handleRemoveItem = ({ target }) => {
    const { cart } = this.state;
    const filteredCart = cart.filter((element) => element.id !== +target.id);
    this.setState({
      cart: filteredCart,
    })
  }

  handleQuantity = (target) => {
    const { value, id } = target;
    const { cart } = this.state
    if (id === 'plus') {
      cart.find((element) => element.id === +value).quantity += 1
    } else {
      if ( cart.find((element) => element.id === +value).quantity > 1)
      cart.find((element) => element.id === +value).quantity -= 1
    }
    this.setState((prevState) => ({
      cart: [
        ...prevState.cart,
      ]
    }))
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
    this.setState({
      actualCurrency: target.value,
    })
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
            handleQuantity: this.handleQuantity,
            handleRemoveItem: this.handleRemoveItem,
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
