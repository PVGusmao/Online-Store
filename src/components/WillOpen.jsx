import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import ProductDetail from '../pages/ProductDetail';

class WillOpen extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home }/>
        <Route path="/productdetail" component={ ProductDetail }/>
      </Switch>
    );
  }
}

export default WillOpen;
