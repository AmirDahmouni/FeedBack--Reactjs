import React, { Component } from "react";
import { getQuestions, deleteQuestion } from "../services/serviceQuestions";

export default class Questions extends Component {
  state = {
    questions: [],
  };
  async componentDidMount() {
    const { data: questions } = await getQuestions();
    this.setState({ questions });
  }
  handleDelete = async (id) => {
    try {
    } catch (ex) {}
  };
  newQuestion = () => {
    this.props.history.push(`/newQuestion`);
  };
  removeQuestion = async (questionId) => {
    const questions = this.state.questions.filter((q) => q._id != questionId);
    this.setState({ questions });
    try {
      await deleteQuestion(questionId);
    } catch (ex) {}
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className="row gtr-uniform">
            <div className="col-12 col-12-small">
              <h1>Questions</h1>
            </div>
            <div className="col-12 col-12-small">
              <button className="button primary" onClick={this.newQuestion}>
                New Question
              </button>
            </div>
            <div className="col-12 col-12-small">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Question</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.questions.map((question) => (
                      <tr>
                        <td>{question.quest}</td>
                        <td>
                          <button
                            className="button primary small fit"
                            onClick={() => this.removeQuestion(question._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
