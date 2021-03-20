import React, { Component } from "react";
import { getSubjectStudent } from "../services/serviceSubjects";
import { getProfessorStudent } from "../services/servicePorfessors";
import { getFeedbacksStudent } from "../services/serviceFeedbacks";
export default class Dashbordstudent extends Component {
  state = {
    feedbacks: [],
    professors: [],
    subjects: [],
    feedbacksfiltred: [],
  };
  async componentDidMount() {
    const { data: subjects } = await getSubjectStudent();
    const { data: professors } = await getProfessorStudent();
    const { data: feedbacks } = await getFeedbacksStudent();
    this.setState({
      subjects,
      professors,
      feedbacks,
      feedbacksfiltred: feedbacks,
    });
  }
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
  handleChangeprof = (e) => {
    if (e.target.value === "") {
      this.setState({ feedbacksfiltred: this.state.feedbacks });
    } else {
      const feedbacks = this.state.feedbacks.filter(
        (c) => c.professor._id == e.target.value
      );
      this.setState({ feedbacksfiltred: feedbacks });
    }
  };
  vote = (feedid) => {
    this.props.history.push(`/votesQuests/${feedid}`);
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
              <select
                name="professor"
                id="professor"
                onChange={this.handleChangeprof}
              >
                <option value="">- Select Professor -</option>
                {this.state.professors.map((itm) => (
                  <option value={itm.userData._id}>
                    {itm.userData.name} {itm.userData.lastname}
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
                      <th>Professor</th>
                      <th>Subject</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.feedbacksfiltred.map((feed) => (
                      <tr>
                        <td onClick={() => this.vote(feed._id)}>
                          <h5>{feed.name}</h5>
                        </td>
                        <td>
                          {feed.professor.lastname + " " + feed.professor.name}
                        </td>
                        <td>{feed.subject.name}</td>

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
