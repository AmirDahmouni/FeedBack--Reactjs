import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import connected from "../images/connected.gif";
export default class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        {" "}
        <header id="header">
          <a className="logo">Feedbacks</a>
          {user.type && (
            <a className="logo">
              <img src={connected} />
              Connected As {user.type}{" "}
            </a>
          )}
          {!user.type && <a className="logo">DisConnected </a>}
          <nav>
            <a href="#menu">Menu</a>
          </nav>
          <nav id="menu">
            <ul className="links">
              <li>
                <NavLink to="/Home">Home</NavLink>
              </li>

              {!user.type && (
                <li>
                  <NavLink to="/Login">Login</NavLink>
                </li>
              )}
              {user.type == "admin" && (
                <React.Fragment>
                  <li>
                    <NavLink to={`/Dashbord${user.type}`}>Dashbord</NavLink>
                  </li>
                  <li>
                    <NavLink to="/questions">Questions</NavLink>
                  </li>
                  <li>
                    <NavLink to="/subjects">Subjects</NavLink>
                  </li>
                  <li>
                    <NavLink to="/classes">Classes</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Students">Students</NavLink>
                  </li>
                  <li>
                    <NavLink to="/Professors">Professors</NavLink>
                  </li>
                </React.Fragment>
              )}
              {user.type && (
                <li>
                  <NavLink to="/LogOut">LogOut</NavLink>
                </li>
              )}
            </ul>
          </nav>
        </header>
      </React.Fragment>
    );
  }
}
