import React, { Component } from "react";
import { getProfessors, deleteProfessor } from "../services/servicePorfessors";
export default class Professors extends Component {
  state = {
    professors: [],
  };
  async componentDidMount() {
    const { data: professors } = await getProfessors();
    this.setState({ professors });
  }
  handleDelete = async (id) => {
    const professors = this.state.professors.filter(
      (p) => p.userData._id != id
    );
    this.setState({ professors });
    try {
      await deleteProfessor(id);
    } catch (ex) {}
  };
  newprof = () => {
    this.props.history.push("/newprofessor");
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className="row gtr-uniform">
            <div className="col-12 col-12-small">
              <h1>Professors</h1>
            </div>
            <div className="col-12 col-12-small">
              <button className="button primary" onClick={this.newprof}>
                New Professor
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
                    {this.state.professors.map((professor) => (
                      <tr>
                        <td>{professor.userData.name}</td>
                        <td>{professor.userData.lastname}</td>
                        <td>
                          <button
                            className="button primary small fit"
                            onClick={() =>
                              this.handleDelete(professor.userData._id)
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
