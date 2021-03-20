import React, { Component } from "react";
import { getSubjectProf } from "../services/serviceSubjects";
import { getClassesProf } from "../services/serviceClasses";
import { getFeedbacksProf } from "../services/serviceFeedbacks";
export default class Dashbordprofessor extends Component {
  state = {
    feedbacks: [],
    classes: [],
    subjects: [],
    feedbacksfiltred: [],
  };
  async componentDidMount() {
    const { data: feedbacks } = await getFeedbacksProf();
    const { data: subjects } = await getSubjectProf();
    const { data: classes } = await getClassesProf();

    this.setState({
      subjects,
      classes,
      feedbacks,
      feedbacksfiltred: feedbacks,
    });
  }
  handleChangeclass = (e) => {
    if (e.target.value == "") {
      this.setState({ feedbacksfiltred: this.state.feedbacks });
    } else {
      const feedbacks = this.state.feedbacks.filter(
        (c) => c.class._id == e.target.value
      );
      this.setState({ feedbacksfiltred: feedbacks });
    }
  };
  handleChangesub = (e) => {
    if (e.target.value == "") {
      this.setState({ feedbacksfiltred: this.state.feedbacks });
    } else {
      const feedbacks = this.state.feedbacks.filter(
        (c) => c.subject._id == e.target.value
      );
      this.setState({ feedbacksfiltred: feedbacks });
    }
  };
  details = (feedid) => {
    this.props.history.push(`/resultquests/${feedid}`);
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className="row gtr-uniform">
            <div className="col-12 col-12-small">
              <h1>Feedbacks</h1>
            </div>
            <div className="col-6 col-6-small">
              <select name="class" id="class" onChange={this.handleChangeclass}>
                <option value="">- Select Class -</option>
                {this.state.classes.map((itm) => (
                  <option value={itm._id}>
                    {itm.filiere} N-{itm.niveau} G-{itm.groupe}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-6 col-6-small">
              <select
                name="subject"
                id="subject"
                onChange={this.handleChangesub}
              >
                <option value="">- Select Subject -</option>
                {this.state.subjects.map((itm) => (
                  <option value={itm._id}>{itm.name}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-12-small">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Numbers</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.feedbacksfiltred.map((feed) => (
                      <tr>
                        <td onClick={() => this.details(feed._id)}>
                          <h5>{feed.name}</h5>
                        </td>
                        <td>
                          {feed.class.filiere +
                            "N" +
                            feed.class.niveau +
                            "G" +
                            feed.class.groupe}
                        </td>
                        <td>{feed.subject.name}</td>
                        <td>{feed.nbvotes}</td>
                        <td>{feed.date}</td>
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
