import React, { Component } from "react";
import { getClasses } from "../services/serviceClasses";
import { deleteClass } from "../services/serviceClasses";
import { deleteClassProfs } from "../services/servicePorfessors";
import { deleteStudentsClass } from "../services/serviceStudent";
export default class Classes extends Component {
  state = {
    classes: [],
  };
  async componentDidMount() {
    const { data: classes } = await getClasses();
    this.setState({ classes });
  }
  handleDelete = async (id) => {
    try {
      await Promise.all(
        deleteClass(id),
        deleteClassProfs(id),
        deleteStudentsClass(id)
      );
    } catch (ex) {}
    const classes = this.state.classes.filter((classe) => classe._id != id);
    this.setState({ classes });
  };
  newclass = () => {
    this.props.history.push("/newClass");
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <div className="row gtr-uniform">
            <div className="col-12 col-12-small">
              <h1>Classes</h1>
            </div>
            <div className="col-12 col-12-small">
              <button className="button primary" onClick={this.newclass}>
                New Class
              </button>
            </div>
            <div className="col-12 col-12-small">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Filiere</th>
                      <th>niveau</th>
                      <th>Groupe</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.classes.map((classe) => (
                      <tr>
                        <td>{classe.filiere}</td>
                        <td>{classe.niveau}</td>
                        <td>{classe.groupe}</td>
                        <td>
                          <button
                            className="button primary small fit"
                            onClick={() => this.handleDelete(classe._id)}
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
