import React, { Component } from "react";
import VoteQuestion from "./votesQuest";
import {
  getFeedbackByid,
  incrementnbvotes,
} from "../services/serviceFeedbacks";
import { getAnswers } from "../services/serviceAnswers";
import { voteFeedback } from "../services/servicequestrep";
import { deleteFeedback } from "../services/serviceStudent";
export default class VotesQuests extends Component {
  state = {
    questions: [],
    answers: [],
    name: "",
    idfeed: "",
    questsreps: [],
  };
  async componentDidMount() {
    const { data: answers } = await getAnswers();
    const { data } = await getFeedbackByid(this.props.match.params.id);
    this.setState({
      answers,
      questions: data.questions,
      name: data.name,
      idfeed: data._id,
    });
  }
  changeoneRadio = (questId, answerId) => {
    var questsreps = [...this.state.questsreps];
    const newquestrep = new Object({ quest: questId, answer: answerId });
    questsreps = questsreps.filter((qr) => qr.quest != questId);
    questsreps.push(newquestrep);
    this.setState({ questsreps });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      this.state.questsreps.map(
        async (qr) => await voteFeedback(this.state.idfeed, qr.quest, qr.answer)
      );
      await Promise.all(
        incrementnbvotes(this.state.idfeed),
        deleteFeedback(this.state.idfeed)
      );
    } catch (ex) {}
    this.props.history.goBack();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
                {this.state.questions.map((question) => (
                  <VoteQuestion
                    question={question}
                    onRadiochange={this.changeoneRadio}
                    answers={this.state.answers}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-6 col-6">
            <ul className="actions">
              <li className="col-12 col-12-small">
                <input type="submit" value="vote" className="primary" />
              </li>
              <li className="col-12 col-12-small">
                <input type="reset" value="Reset" />
              </li>
            </ul>
          </div>
        </div>
      </form>
    );
  }
}
