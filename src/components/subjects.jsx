import React, { Component } from "react";
import { getSubjects, deleteSubject } from "../services/serviceSubjects";
export default class Subjects extends Component {
  state = {
    subjects: [],
  };
  async componentDidMount() {
    const { data: subjects } = await getSubjects();
    this.setState({ subjects });
  }
  newsubject = () => {
    this.props.history.push("/newSubject");
  };
  removeSubject = async (subjectId) => {
    const subjects = this.state.subjects.filter((s) => s._id != subjectId);
    this.setState({ subjects });
    try {
      await deleteSubject(subjectId);
    } catch (ex) {}
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className="row gtr-uniform">
            <div className="col-12 col-12-small">
              <h1>Subjects</h1>
            </div>
            <div className="col-12 col-12-small">
              <button className="button primary" onClick={this.newsubject}>
                New Subject
              </button>
            </div>
            <div className="col-12 col-12-small">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.subjects.map((subject) => (
                      <tr>
                        <td>{subject.name}</td>
                        <td>
                          <button
                            className="button primary small fit"
                            onClick={() => this.removeSubject(subject._id)}
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
