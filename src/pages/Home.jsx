import React from 'react';
import Header from '../components/Header';
import CommerceContext from '../context/CommerceContext';

class Home extends React.Component {
  render() {
    return (
      <Header />
    );
  }
}

Home.contextType = CommerceContext;
export default Home;
