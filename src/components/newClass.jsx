import React, { Component } from "react";
import Form from "./commun/form";
import Joi from "joi-browser";
import { getSubjects } from "../services/serviceSubjects";
import { exceptions } from "winston";
import { setClass } from "../services/serviceClasses";

export default class newClass extends Form {
  state = {
    data: { filiere: "", niveau: 0, groupe: 0 },
    errors: {},
    subjects: [],
    subjectschecked: [],
  };
  schema = {
    filiere: Joi.string().required(),
    niveau: Joi.number().min(1).max(3).required(),
    groupe: Joi.number().min(1).required(),
  };
  async componentDidMount() {
    const { data: subjects } = await getSubjects();
    this.setState({ subjects });
  }
  doSubmit = async () => {
    try {
      if (this.state.subjectschecked.length == 0)
        throw exceptions("no question checked");
      await setClass(
        this.state.data.filiere,
        this.state.data.niveau,
        this.state.data.groupe,
        this.state.subjectschecked
      );
      this.props.history.goBack();
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        console.log("erreur");
      }
    }
  };
  selectcheckbox = (e) => {
    const subjects = [...this.state.subjectschecked];
    if (e.currentTarget.checked) {
      subjects.push(e.currentTarget.id);
    } else if (!e.currentTarget.checked) {
      subjects.splice(subjects.indexOf(e.currentTarget.id), 1);
    }
    this.setState({ subjectschecked: subjects });
  };
  render() {
    return (
      <div className="inner">
        <form onSubmit={this.handleSubmit}>
          <div className="row gtr-uniform">
            <div className="col-12 col-12-small">
              <h1>New Class</h1>
            </div>
            <div className="col-12 col-12-small">
              <input
                type="text"
                name="filiere"
                id="name"
                placeholder="Filiere"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 col-12-small">
              <input
                type="text"
                name="niveau"
                id="name"
                placeholder="niveau"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 col-12-small">
              <input
                type="text"
                name="groupe"
                id="name"
                placeholder="Groupe"
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 col-12-small">
            <h3>Subjects</h3>
              {this.state.subjects.map((s) => (
                <div className="col-12 col-12-small">
                  {" "}
                  <input
                    type="checkbox"
                    id={s._id}
                    name={s.name}
                    onChange={this.selectcheckbox}
                  />
                  <label htmlFor={s._id}>{s.name}</label>{" "}
                </div>
              ))}
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
