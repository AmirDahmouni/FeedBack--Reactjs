import React, { Component } from "react";

export default class Feedbacks extends Component {
  render() {
    return (
      <React.Fragment>
        <tbody>
          {this.props.Feedbacks.map((feed) => (
            <tr>
              <td onClick={() => this.props.details(feed._id)}>
                <h5>{feed.name}</h5>
              </td>
              <td>
                {feed.class.filiere +
                  "N" +
                  feed.class.niveau +
                  "G" +
                  feed.class.groupe}
              </td>
              <td>{feed.professor.lastname + " " + feed.professor.name}</td>
              <td>{feed.subject.name}</td>
              <td>{feed.nbvotes}</td>
              <td>{feed.date}</td>
              <td>
                <button
                  className="button primary small fit"
                  onClick={() => this.props.Delete(feed._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </React.Fragment>
    );
  }
}
