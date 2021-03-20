import React, { Component } from "react";
import Form from "../components/commun/form";
import Joi from "joi-browser";
import { setStudent } from "../services/serviceStudent";
import { getClasses } from "../services/serviceClasses";
Joi.objectId = require("joi-objectid")(Joi);
export default class newSubject extends Form {
  state = {
    data: {
      name: "",
      lastname: "",
      adress: "",
      password: "",
      class: "",
    },
    errors: {},
    classes: [],
  };
  schema = {
    name: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    adress: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
    class: Joi.objectId().required(),
  };
  async componentDidMount() {
    const { data: classes } = await getClasses();
    this.setState({ classes });
  }
  doSubmit = async () => {
    try {
      await setStudent(
        this.state.data.name,
        this.state.data.lastname,
        this.state.data.adress,
        this.state.data.password,
        this.state.data.class
      );
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
              <h1>New Student</h1>
            </div>
            <div className="col-12 col-12-small">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 col-12-small">
              <input
                type="text"
                name="lastname"
                id="name"
                placeholder="LastName"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 col-12-small">
              <input
                type="text"
                name="adress"
                id="name"
                placeholder="email"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 col-12-small">
              <input
                type="password"
                name="password"
                id="name"
                placeholder="password"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 col-12-small">
              <select name="class" id="class" onChange={this.handleChange}>
                <option value="">- Select Class -</option>
                {this.state.classes.map((itm) => (
                  <option value={itm._id}>
                    {itm.filiere} N-{itm.niveau} G-{itm.groupe}
                  </option>
                ))}
              </select>
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
