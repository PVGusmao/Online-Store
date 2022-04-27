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
    }
  }

  handleCompleteAPI = async () => {
    const data = await fetchData();
    this.setState({data});
  }

  handleCurrencies = async () => {
    const data = await fetchCurrency();
    this.setState({ currency: data })
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
            handleCurrencies: this.handleCurrencies,
            handleChangeCurrency: this.handleChangeCurrency,
            handleChangeCategory: this.handleChangeCategory,
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
