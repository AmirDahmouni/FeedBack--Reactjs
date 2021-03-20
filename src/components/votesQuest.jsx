import React, { Component } from "react";
import good from "../images/good.png";
export default class VoteQuestion extends Component {
 
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
              <input
                type="radio"
                name={this.props.question._id}
                id={this.props.question._id + this.props.answers[1]._id}
                onChange={() =>
                  this.props.onRadiochange(
                    this.props.question._id,
                    this.props.answers[1]._id
                  )
                }
              />
              <label
                for={this.props.question._id + this.props.answers[1]._id}
              ></label>
            </div>
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
              <input
                type="radio"
                name={this.props.question._id}
                id={this.props.question._id + this.props.answers[0]._id}
                onChange={() =>
                  this.props.onRadiochange(
                    this.props.question._id,
                    this.props.answers[0]._id
                  )
                }
              />
              <label
                for={this.props.question._id + this.props.answers[0]._id}
              ></label>
            </div>
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
              <input
                type="radio"
                name={this.props.question._id}
                id={this.props.question._id + this.props.answers[2]._id}
                onChange={() =>
                  this.props.onRadiochange(
                    this.props.question._id,
                    this.props.answers[2]._id
                  )
                }
              />
              <label
                for={this.props.question._id + this.props.answers[2]._id}
              ></label>
            </div>
          </div>
        </td>
        <td>
          <div class="reaction-item align align--column align--middle reaction-item__enabled">
            <div class="align align--middle reaction-item__button">
              <img src={good} width="40" height="40" />
              <input
                type="radio"
                name={this.props.question._id}
                id={this.props.question._id + this.props.answers[3]._id}
                onChange={() =>
                  this.props.onRadiochange(
                    this.props.question._id,
                    this.props.answers[3]._id
                  )
                }
              />
              <label
                for={this.props.question._id + this.props.answers[3]._id}
              ></label>
            </div>
          </div>
        </td>
        <td>
          <div class="reaction-item align align--column align--middle reaction-item__enabled">
            <div class="align align--middle reaction-item__button">
              <img
                src="//c.disquscdn.com/next/current/publisher-admin/assets/img/emoji/love-512x512.png"
                width="30"
                height="30"
              />
              <input
                type="radio"
                name={this.props.question._id}
                id={this.props.question._id + this.props.answers[4]._id}
                onChange={() =>
                  this.props.onRadiochange(
                    this.props.question._id,
                    this.props.answers[4]._id
                  )
                }
              />
              <label
                for={this.props.question._id + this.props.answers[4]._id}
              ></label>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
