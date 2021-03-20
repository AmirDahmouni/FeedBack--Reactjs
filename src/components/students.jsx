import React, { Component } from "react";
import { getStudents } from "../services/serviceStudent";
import { deleteStudent } from "../services/serviceStudent";
export default class Students extends Component {
  state = {
    students: [],
  };
  async componentDidMount() {
    const { data: students } = await getStudents();
    this.setState({ students });
  }
  handleDelete = async (id) => {
    const students = this.state.students.filter((s) => s.userData._id != id);
    this.setState({ students });
    try {
      await deleteStudent(id);
    } catch (ex) {}
  };
  newstudent = () => {
    this.props.history.push("/newstudent");
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className="row gtr-uniform">
            <div className="col-12 col-12-small">
              <h1>Students</h1>
            </div>
            <div className="col-12 col-12-small">
              <button className="button primary" onClick={this.newstudent}>
                New Student
              </button>
            </div>
            <div className="col-12 col-12-small">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>name</th>
                      <th>lastname</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.students.map((student) => (
                      <tr>
                        <td>{student.userData.name}</td>
                        <td>{student.userData.lastname}</td>
                        <td>
                          <button
                            className="button primary small fit"
                            onClick={() =>
                              this.handleDelete(student.userData._id)
                            }
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
