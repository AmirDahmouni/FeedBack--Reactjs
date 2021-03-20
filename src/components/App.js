import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import Home from "./home";
import Login from "./login";
import NotFound from "./notfound/notFound";
import Suggestion from "./suggestion";
import Forbidden from "./forbidden/forbidden";
import DashbordAdmin from "./dashbordadmin";
import resultQuestions from "./resultquests";
import newFeed from "./newfeed";
import newQuestion from "./newQuestion";
import newSubject from "./newSubject";
import newClass from "./newClass";
import newStudent from "./newStudent";
import newPorfessor from "./newProf";
import Logout from "./logout";
import ProtectedRoute from "./ProtectedRoute";
import Dashbordprofessor from "./dashbordprofessor";
import Dashbordstudent from "./dashbordstudent";
import VotesQuests from "./votesQuests";
import Questions from "./Questions";
import Subjects from "./subjects";
import Classes from "./Classes";
import Professors from "./professors";
import Students from "./students";
import { getCurentuser } from "../services/userService";
import "./App.css";

export default class App extends Component {
  state = { user: {} };
  componentDidMount() {
    try {
      const user = getCurentuser();
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <React.Fragment>
        <Header user={this.state.user} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/Home" exact component={Home} />
          <Route path="/suggestion" component={Suggestion} />
          <Route path="/forbidden" component={Forbidden}/>
          
          {!this.state.user.type && <Route path="/Login" component={Login} />}
          <ProtectedRoute path="/Logout" component={Logout} />

          {this.state.user.type == "admin" && (
            <React.Fragment>
              <Route path="/Dashbordadmin" component={DashbordAdmin} />
              <Route path="/resultquests/:id" component={resultQuestions} />
              <Route path="/new" component={newFeed} />
              <Route path="/newQuestion" component={newQuestion} />
              <Route path="/newSubject" component={newSubject} />
              <Route path="/newClass" component={newClass} />
              <Route path="/newstudent" component={newStudent} />
              <Route path="/newprofessor" component={newPorfessor} />
              <Route path="/questions" component={Questions} />
              <Route path="/subjects" component={Subjects} />
              <Route path="/classes" component={Classes} />
              <Route path="/students" component={Students} />
              <Route path="/professors" component={Professors} />
              <Route path="/suggestion" component={Suggestion} />
            </React.Fragment>
          )}
          {this.state.user.type == "professor" && (
            <React.Fragment>
              <Route path="/forbidden" component={Forbidden} />
              <Route path="/resultquests/:id" component={resultQuestions} />
              <Route path="/Dashbordprofessor" component={Dashbordprofessor} />
              <Route path="/newQuestion" component={Forbidden} />
              <Route path="/newSubject" component={Forbidden} />
              <Route path="/newClass" component={Forbidden} />
              <Route path="/newstudent" component={Forbidden} />
              <Route path="/newprofessor" component={Forbidden} />
              <Route path="/questions" component={Forbidden} />
              <Route path="/subjects" component={Forbidden} />
              <Route path="/classes" component={Forbidden} />
              <Route path="/students" component={Forbidden} />
              <Route path="/professors" component={Forbidden} />
              <Route path="/suggestion" component={Suggestion} />
            </React.Fragment>
          )}
          {this.state.user.type == "student" && (
            <React.Fragment>
             
              <Route path="/Dashbordstudent" component={Dashbordstudent} />
              <Route path="/votesQuests/:id" component={VotesQuests} />
              <Route path="/new" component={Forbidden} />
              <Route path="/newQuestion" component={Forbidden} />
              <Route path="/newSubject" component={Forbidden} />
              <Route path="/newClass" component={Forbidden} />
              <Route path="/newstudent" component={Forbidden} />
              <Route path="/newprofessor" component={Forbidden} />
              <Route path="/questions" component={Forbidden} />
              <Route path="/subjects" component={Forbidden} />
              <Route path="/classes" component={Forbidden} />
              <Route path="/students" component={Forbidden} />
              <Route path="/professors" component={Forbidden}/>
              <Route path="/suggestion" component={Suggestion} />
            </React.Fragment>
          )}
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}
