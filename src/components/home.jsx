import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <section id="banner">
            <img src="../images/banner.jpg" alt="img"></img>
            <div className="inner">
              <h1>Feedbacks</h1>
              <p>
                your feedback is highly appreciated and will help us to improve
              </p>
            </div>
          </section>

          <section class="wrapper">
            <div class="inner">
              <header class="special">
                <h2>
                  Our platform takes into account professor and student
                  opinions.
                </h2>
              </header>
              <div class="highlights">
                <section>
                  <div class="content">
                    <header>
                      <a
                        href="https://www.facebook.com/"
                        class="icon fa-vcard-o"
                      >
                        <span class="label">Icon</span>
                      </a>
                      <h3>ADMIN</h3>
                    </header>
                    <p>view all feedback by class,prof,subject</p>
                    <p>Add new feedback</p>
                  </div>
                </section>
                <section>
                  <div class="content">
                    <header>
                      <a
                        href="https://www.facebook.com/"
                        class="icon fa-files-o"
                      >
                        <span class="label">Icon</span>
                      </a>
                      <h3>Porfessor</h3>
                    </header>
                    <p>View all feedbacks of his classes,subjects .</p>
                  </div>
                </section>
                <section>
                  <div class="content">
                    <header>
                      <a
                        href="https://www.facebook.com/"
                        class="icon fa-floppy-o"
                      >
                        <span class="label">Icon</span>
                      </a>
                      <h3>Student</h3>
                    </header>
                    <p>view all feedback by class,prof,subject</p>
                    <p>participate to feedback</p>
                  </div>
                </section>
              </div>
            </div>
          </section>
          <section id="cta" class="wrapper">
            <p></p>
          </section>
        </div>
      </React.Fragment>
    );
  }
}
