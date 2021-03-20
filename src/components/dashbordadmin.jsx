import React, { Component } from "react";
import Feedbacks from "./tableFeedbacks";
import Pagination from "./commun/pagination";
import PropTypes from "prop-types";
import { getSubjects } from "../services/serviceSubjects";
import { getClasses } from "../services/serviceClasses";
import { getProfessors } from "../services/servicePorfessors";
import { getFeedbacks } from "../services/serviceFeedbacks";
import { deleteFeedbackById } from "../services/serviceFeedbacks";
import { paginate } from "../utils/Paginate";
export default class DashbordAdmin extends Component {
  state = {
    feedbacks: [],
    allFiltredFeedbacks: [],
    professors: [],
    classes: [],
    subjects: [],
    pageSize:4,
    currentPage:1
  };
  async componentDidMount() {
    const { data: subjects } = await getSubjects();
    const { data: classes } = await getClasses();
    const { data: professors } = await getProfessors();
    const { data: feedbacks } = await getFeedbacks();
    this.setState({
      subjects,
      classes,
      professors,
      feedbacks,
      allFiltredFeedbacks: feedbacks,
    });
  }
  handleDelete = async (id) => {
    try {
      await deleteFeedbackById(id);
      window.location = "/dashbordAdmin";
    } catch (ex) {}
  };

  handleChangeclass = (e) => {
    if (e.target.value == "") {
      this.setState({ allFiltredFeedbacks: this.state.feedbacks });
    } else {
      const feedbacks = this.state.feedbacks.filter(
        (c) => c.class._id == e.target.value
      );
      this.setState({ allFiltredFeedbacks: feedbacks });
    }
  };
  handleChangeprof = (e) => {
    if (e.target.value == "") {
      this.setState({ allFiltredFeedbacks: this.state.feedbacks });
    } else {
      const feedbacks = this.state.feedbacks.filter(
        (c) => c.professor._id == e.target.value
      );
      this.setState({ allFiltredFeedbacks: feedbacks });
    }
  };
  handleChangesub = (e) => {
    if (e.target.value == "") {
      this.setState({ allFiltredFeedbacks: this.state.feedbacks });
    } else {
      const feedbacks = this.state.feedbacks.filter(
        (c) => c.subject._id == e.target.value
      );
      this.setState({ allFiltredFeedbacks: feedbacks });
    }
  };
  newfeed = () => {
    this.props.history.replace("/new");
  };
  readResults = (feedid) => {
    this.props.history.push(`/resultquests/${feedid}`);
  };
  onChangePage=(page)=>{
    this.setState({currentPage:page});
  };
  render() {
    const {allFiltredFeedbacks,currentPage,pageSize}=this.state;
    const feedbacksfiltred=paginate(allFiltredFeedbacks,currentPage,pageSize);
    return (
      <React.Fragment>
        <div className="App">
          <div className="row gtr-uniform">
            <div className="col-12 col-12-small">
              <h1>Feedbacks</h1>
            </div>
            <div className="col-12 col-12-small">
              <button className="button primary" onClick={this.newfeed}>
                New Feedback
              </button>
            </div>
            <div className="col-4 col-4-small">
              <select name="class" id="class" onChange={this.handleChangeclass}>
                <option value="">- Select Class -</option>
                {this.state.classes.map((itm) => (
                  <option value={itm._id}>
                    {itm.filiere} N-{itm.niveau} G-{itm.groupe}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-4 col-4-small">
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
            <div className="col-4 col-4-small">
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
                      <th>Professor</th>
                      <th>Subject</th>
                      <th>Numbers</th>
                      <th>Date</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <Feedbacks
                    Feedbacks={feedbacksfiltred}
                    Delete={this.handleDelete}
                    details={this.readResults}
                  />
                </table>
                <Pagination itemsCount={this.state.allFiltredFeedbacks.length} 
                pageSize={this.state.pageSize} 
                onChangePage={this.onChangePage}
                  currentPage={this.state.currentPage}
                
                
                />
             </div>
            </div>
            </div>
           </div>
      </React.Fragment>
    );
  }
}
Pagination.prototype={
  allFiltredFeedbacks:PropTypes.array.isRequired,
  currentPage:PropTypes.number.isRequired,
  pageSize:PropTypes.number.isRequired
};
