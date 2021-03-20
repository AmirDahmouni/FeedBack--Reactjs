import React from "react";
import Joi from "joi-browser";
import Form from "./commun/form";
import { login, getCurentuser } from "../services/userService";
export default class Login extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };
  schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  };
  doSubmit = async () => {
    const { data } = this.state;
    try {
      await login(data.email, data.password);
      const user = getCurentuser();
      if (user.type === "admin") {
        window.location = "/Dashbordadmin";
      } else if (user.type === "professor") {
        window.location = "/Dashbordprofessor";
      } else {
        window.location = "/Dashbordstudent";
      }
    } 
    catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="inner">
          <form onSubmit={this.handleSubmit}>
            <div className="row gtr-uniform">
              <div>
                <h1>Login Page</h1>
              </div>
              <div className="col-12 col-12-small">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.email && (
                <div className="alert alert-danger" role="alert">
                  {this.state.errors.email}
                </div>
              )}
              <div className="col-12 col-12-small">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                {this.state.errors.password && (
                  <div className="alert alert-danger" role="alert">
                    {this.state.errors.password}
                  </div>
                )}
              </div>
              <div className="col-6 col-6-small">
                <ul className="actions">
                  <li className="col-12 col-12-small">
                    <input
                      type="submit"
                      value="Login"
                      className="primary"
                      disabled={this.validate()}
                    />
                  </li>
                  <li className="col-12 col-12-small">
                    <input type="reset" value="Reset" />
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
