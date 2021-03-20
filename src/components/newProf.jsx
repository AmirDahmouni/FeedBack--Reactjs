import React from "react";
import Form from "../components/commun/form";
import Joi from "joi-browser";
import { setProfessor } from "../services/servicePorfessors";
import { getClasses } from "../services/serviceClasses";
import { getSubjects } from "../services/serviceSubjects";
Joi.objectId = require("joi-objectid")(Joi);
export default class newSubject extends Form {
  state = {
    data: {
      name: "",
      lastname: "",
      adress: "",
      password: "",
    },
    errors: {},
    classes: [],
    subjects: [],
    classeschecked: [],
    subjectschecked: [],
  };
  schema = {
    name: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    adress: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
  };
  async componentDidMount() {
    const { data: classes } = await getClasses();
    const { data: subjects } = await getSubjects();
    this.setState({ classes, subjects });
  }
  doSubmit = async () => {
    try {
      await setProfessor(
        this.state.data.name,
        this.state.data.lastname,
        this.state.data.adress,
        this.state.data.password,
        this.state.classeschecked,
        this.state.subjectschecked
      );
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        console.log("erreur");
      }
    }
    this.props.history.goBack();
  };
  selectcheckboxclasses = (e) => {
    const classes = [...this.state.classeschecked];
    if (e.currentTarget.checked) {
      classes.push(e.currentTarget.id);
    } else if (!e.currentTarget.checked) {
      classes.splice(classes.indexOf(e.currentTarget.id), 1);
    }
    this.setState({ classeschecked: classes });
  };
  selectcheckboxsubjects = (e) => {
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
              <h1>New Professor</h1>
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
            <div className="col-12 col-4-small">
              <h3>Classes</h3>
              {this.state.classes.map((classe) => (
                <div className="col-4 col-4-small">
                  {" "}
                  <input
                    type="checkbox"
                    id={classe._id}
                    name={classe.filiere}
                    onChange={this.selectcheckboxclasses}
                  />
                  <label htmlFor={classe._id}>
                    {classe.filiere + "N" + classe.niveau + "G" + classe.groupe}
                  </label>{" "}
                </div>
              ))}
            </div>
            <div className="col-12 col-4-small">
              <h3>Subjects</h3>
              {this.state.subjects.map((subject) => (
                <div className="col-4 col-4-small">
                  {" "}
                  <input
                    type="checkbox"
                    id={subject._id}
                    name={subject.name}
                    onChange={this.selectcheckboxsubjects}
                  />
                  <label htmlFor={subject._id}>{subject.name}</label>{" "}
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
