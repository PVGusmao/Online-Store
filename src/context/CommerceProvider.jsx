import React from 'react';
import PropTypes from 'prop-types';
import CommerceContext from './CommerceContext';
import { fetchData } from '../services/api';

class CommerceProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    }
  }

  handleAPI = async () => {
    const data = await fetchData();
    this.setState({data});
  }
  
  render() {
    const { Provider } = CommerceContext;
    const { children } = this.props;
      return (
        <Provider
          value={ {
            ...this.state,
            handleAPI: this.handleAPI,
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
