import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./commun/form";
import { SendMail } from "../services/serviceMail";
export default class Home extends Form {
  state = {
    data: { email: "", message: "", subject: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().email().required(),
    subject: Joi.string().min(10).required(),
    message: Joi.string().min(10).required(),
  };
  doSubmit = async (e) => {
    const { email, message, subject } = this.state.data;
    await SendMail(email, message, subject);
    window.location = "/";
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <form onSubmit={this.handleSubmit}>
            <div class="row gtr-uniform">
              <div class="col-12">
                <h1>Hi and </h1>
              </div>
              <div class="col-12">
                <h1>Welcome for any suggestion</h1>
              </div>
              <div class="col-12 col-12-small">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
                {this.state.errors.email && (
                  <div className="alert alert-danger" role="alert">
                    {this.state.errors.email}
                  </div>
                )}
              </div>
              <div class="col-12 col-12-small">
                <input
                  type="text"
                  name="subject"
                  id="email"
                  placeholder="Subject"
                  onChange={this.handleChange}
                />
                {this.state.errors.subject && (
                  <div className="alert alert-danger" role="alert">
                    {this.state.errors.subject}
                  </div>
                )}
              </div>
              <div class="col-12">
                <textarea
                  name="message"
                  id="textarea"
                  placeholder="Message...."
                  rows="5"
                  onChange={this.handleChange}
                ></textarea>
                {this.state.errors.message && (
                  <div className="alert alert-danger" role="alert">
                    {this.state.errors.message}
                  </div>
                )}
              </div>

              <div class="col-12">
                <ul class="actions">
                  <li>
                    <input
                      type="submit"
                      value="Send"
                      class="primary"
                      disabled={this.validate()}
                    />
                  </li>
                  <li>
                    <input type="reset" value="Reset" />
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
