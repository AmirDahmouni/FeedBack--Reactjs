import React, { Component } from "react";
import Form from "../components/commun/form";
import Joi from "joi-browser";
import { getClasses } from "../services/serviceClasses";
import { getProfessorsByClass } from "../services/servicePorfessors";
import { getSubjectsByProf } from "../services/servicePorfessors";
import { getQuestions } from "../services/serviceQuestions";
import { setFeedback } from "../services/serviceFeedbacks";
import {getemailsByclass} from "../services/serviceStudent";
import { sendEmailNewFeedback} from "../services/serviceMail";
import {getProfessorById} from "../services/userService";
import { getSubjectById } from "../services/serviceSubjects";
import { exceptions } from "winston";
Joi.objectId = require("joi-objectid")(Joi);
export default class newFeed extends Form {
  state = {
    professors: [],
    classes: [],
    subjects: [],
    questions: [],
    data: {
      name: "",
      subject: "",
      class: "",
      professor: "",
    },
    questionschecked: [],
    errors: {},
  };
  schema = {
    name: Joi.string().required(),
    subject: Joi.objectId(),
    class: Joi.objectId(),
    professor: Joi.objectId(),
  };
  async componentDidMount() {
    const { data: classes } = await getClasses();
    const { data: questions } = await getQuestions();
    this.setState({ classes, questions });
  }
  handleChangeprofs = async (e) => {
    this.handleChange(e);
    const { data: professors } = await getProfessorsByClass(
      e.currentTarget.value
    );
    this.setState({ professors });
  };
  handleChangesubjects = async (e) => {
    this.handleChange(e);
    const { data: subjects } = await getSubjectsByProf(e.currentTarget.value);
    this.setState({ subjects });
  };
  doSubmit = async () => {
    try {
      if (this.state.questionschecked.length == 0)
        throw exceptions("no question checked");
      await setFeedback(
        this.state.data.name,
        this.state.data.professor,
        this.state.data.class,
        this.state.data.subject,
        this.state.questionschecked
      );
      const {data:students}=await getemailsByclass(this.state.data.class);
      const {data:professor}=await getProfessorById(this.state.data.professor);
      const {data:subject}=await getSubjectById(this.state.data.subject);
      let msg=`you are invited to give your opinion through mr/ms ${professor.name} ${professor.lastname}'s 
               feedback on his ${subject.name} matter`;
               
      students.map(async (student)=>{
        console.log(student.userData.adress);
        await sendEmailNewFeedback(student.userData.adress,msg);
      })
      
      window.location = "/Dashbordadmin";
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 400) {
        console.log("erreur");
      }
    }
  };
  selectcheckbox = (e) => {
    const questions = [...this.state.questionschecked];
    if (e.currentTarget.checked) {
      questions.push(e.currentTarget.id);
    } else if (!e.currentTarget.checked) {
      questions.splice(questions.indexOf(e.currentTarget.id), 1);
    }
    this.setState({ questionschecked: questions });
  };
  render() {
    return (
      <div className="inner">
        <form onSubmit={this.handleSubmit}>
          <div className="row gtr-uniform">
            <div className="col-12 col-12-small">
              <h1>New Feedback</h1>
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
            {this.state.errors.name && (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.name}
              </div>
            )}

            <div className="col-12 col-12-small">
              <select name="class" id="class" onChange={this.handleChangeprofs}>
                <option value="">- Select Class -</option>
                {this.state.classes.map((itm) => (
                  <option value={itm._id} name="class">
                    {itm.filiere} N-{itm.niveau} G-{itm.groupe}
                  </option>
                ))}
              </select>
            </div>
            {this.state.errors.class && (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.class}
              </div>
            )}
            <div className="col-12 col-12-small">
              <select
                name="professor"
                id="professor"
                onChange={this.handleChangesubjects}
              >
                <option value="">- Select Professor -</option>
                {this.state.professors.map((itm) => (
                  <option value={itm.userData._id} name="professor">
                    {itm.userData.name} {itm.userData.lastname}
                  </option>
                ))}
              </select>
            </div>
            {this.state.errors.professor && (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.professor}
              </div>
            )}
            <div className="col-12 col-12-small">
              <select name="subject" id="subject" onChange={this.handleChange}>
                <option value="">- Select Subject -</option>
                {this.state.subjects.map((itm) => (
                  <option value={itm._id} name="subject">
                    {itm.name}
                  </option>
                ))}
              </select>
            </div>
            {this.state.errors.subject && (
              <div className="alert alert-danger" role="alert">
                {this.state.errors.subject}
              </div>
            )}
            <div className="col-12 col-12-small">
              {this.state.questions.map((q) => (
                <div className="col-12 col-12-small">
                  {" "}
                  <input
                    type="checkbox"
                    id={q._id}
                    name={q.quest}
                    onChange={this.selectcheckbox}
                  />
                  <label htmlFor={q._id}>{q.quest}</label>{" "}
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
