import React, { Component } from "react";
import good from "../images/good.png";
import {
  getnbbad,
  getnbnotbad,
  getnbgood,
  getnbverygood,
  getnbexcell,
} from "../services/serviceFeedbacks";

export default class ResultQuestion extends Component {
  state = { bad: 0, notbad: 0, good: 0, verygood: 0, excellent: 0 };

  async componentDidMount() {
    const { data: bad } = await getnbbad(
      this.props.feedId,
      this.props.question._id
    );
    const { data: notbad } = await getnbnotbad(
      this.props.feedId,
      this.props.question._id
    );
    const { data: good } = await getnbgood(
      this.props.feedId,
      this.props.question._id
    );
    const { data: verygood } = await getnbverygood(
      this.props.feedId,
      this.props.question._id
    );
    const { data: excellent } = await getnbexcell(
      this.props.feedId,
      this.props.question._id
    );
    this.setState({ bad, notbad, good, verygood, excellent });
  }
  render() {
    return (
      <tr>
        <td>{this.props.question.quest}</td>
        <td>
          <div class="reaction-item align align--column align--middle reaction-item__enabled">
            <div class="align align--middle reaction-item__button">
              <img
                src="//c.disquscdn.com/next/current/publisher-admin/assets/img/emoji/angry-512x512.png"
                width="30"
                height="30"
              />
            </div>
            <h4>{this.state.bad}</h4>
          </div>
        </td>
        <td>
          <div class="reaction-item align align--column align--middle reaction-item__enabled">
            <div class="align align--middle reaction-item__button">
              <img
                src="//c.disquscdn.com/next/current/publisher-admin/assets/img/emoji/sad-512x512.png"
                width="30"
                height="30"
              />
            </div>
            <h4>{this.state.notbad}</h4>
          </div>
        </td>
        <td>
          <div class="reaction-item align align--column align--middle reaction-item__enabled">
            <div class="align align--middle reaction-item__button">
              <img
                src="//c.disquscdn.com/next/current/publisher-admin/assets/img/emoji/upvote-512x512.png"
                width="30"
                height="30"
              />
            </div>
            <h4>{this.state.good}</h4>
          </div>
        </td>
        <td>
          <div class="reaction-item align align--column align--middle reaction-item__enabled">
            <div class="align align--middle reaction-item__button">
              <img src={good} width="40" height="40" />
            </div>
          </div>
          <h4>{this.state.verygood}</h4>
        </td>
        <td>
          <div class="reaction-item align align--column align--middle reaction-item__enabled">
            <div class="align align--middle reaction-item__button">
              <img
                src="//c.disquscdn.com/next/current/publisher-admin/assets/img/emoji/love-512x512.png"
                width="30"
                height="30"
              />
            </div>
            <h4>{this.state.excellent}</h4>
          </div>
        </td>
      </tr>
    );
  }
}
