import React from "react";
import { Route, Switch } from "react-router-dom";
import CartPage from "../pages/CartPage";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";

class WillOpen extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/productdetail/:id" component={ProductDetail} />
        <Route path="/cart" component={CartPage} />
      </Switch>
    );
  }
}

export default WillOpen;
