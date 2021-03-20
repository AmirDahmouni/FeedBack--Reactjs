import React, { Component } from "react";
import { logout } from "../services/userService";
export default class Logout extends Component {
  componentDidMount() {
    logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}
