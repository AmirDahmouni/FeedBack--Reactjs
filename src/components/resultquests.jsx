import React, { Component } from "react";
import ResultQuestion from "./resultquest";
import { getFeedbackByid } from "../services/serviceFeedbacks";
export default class resultQuestions extends Component {
  state = {
    questions: [],
    name: "",
    idfeed: "",
  };
  async componentDidMount() {
    const { data } = await getFeedbackByid(this.props.match.params.id);
    this.setState({
      questions: data.questions,
      name: data.name,
      idfeed: data._id,
    });
  }
  render() {
    return (
      <div className="col-12 col-12-small">
        <div align="center">
          <h1>{this.state.name}</h1>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Bad</th>
                <th>NOT BAD</th>
                <th>GOOD</th>
                <th>Very Good</th>
                <th>Excellent</th>
              </tr>
            </thead>
            <tbody>
              {this.state.questions.map((q) => (
                <ResultQuestion question={q} feedId={this.state.idfeed} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
