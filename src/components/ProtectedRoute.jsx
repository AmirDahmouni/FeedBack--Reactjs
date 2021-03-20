import React from "react";
import { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { getJwt } from "../services/userService";
export default class PortectedRoute extends Component {
  render() {
    const { path, component: Component, render } = this.props;
    return (
      <Route
        paht={path}
        render={(props) => {
          if (!getJwt()) return <Redirect to="/forbidden" />;
          return Component ? <Component {...props} /> : render(props);
        }}
      />
    );
  }
}
