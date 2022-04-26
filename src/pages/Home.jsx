import React from 'react';
import { fetchData } from '../services/api';

class Home extends React.Component {

  componentDidMount() {
    this.handleData();
  }

  handleData = async () => {
    const data = await fetchData()
    this.setState({
      data,
    })
  }

  render() {
    return (
      <>
        Início
      </>
    );
  }
}

export default Home;
