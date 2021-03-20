import React, { Component } from "react";
import Form from "../components/commun/form";
import Joi from "joi-browser";
import { setSubject } from "../services/serviceSubjects";
Joi.objectId = require("joi-objectid")(Joi);
export default class newSubject extends Form {
  state = {
    data: {
      subject: "",
    },
    errors: {},
  };
  schema = {
    subject: Joi.string().min(3).required(),
  };
  doSubmit = async () => {
    try {
      await setSubject(this.state.data.subject);
      this.props.history.goBack();
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        console.log("erreur");
      }
    }
  };
  render() {
    return (
      <div className="inner">
        <form onSubmit={this.handleSubmit}>
          <div className="row gtr-uniform">
            <div className="col-12 col-12-small">
              <h1>New Subject</h1>
            </div>
            <div className="col-12 col-12-small">
              <input
                type="text"
                name="subject"
                id="name"
                placeholder="Subject"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-6 col-6-small">
              <ul className="actions">
                <li className="col-12 col-12-small">
                  <input
                    type="submit"
                    value="Add"
                    className="primary"
                    disabled={this.validate()}
                  />
                </li>
                <li className="col-12 col-12-small">
                  <input type="reset" value="Reset" />
                </li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
