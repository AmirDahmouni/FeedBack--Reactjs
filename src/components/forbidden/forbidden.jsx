import React, { Component } from "react";
import "./style.css";
export default class NotFound extends Component {
  render() {
    return (
      <div class="mainbox">
        <div class="err">4</div>
        <i class="far fa-question-circle fa-spin"></i>
        <div class="err2">3</div>
        <div class="msg">
          You do Not have permission to access to the document or program that
          you requested
        </div>
      </div>
    );
  }
}
