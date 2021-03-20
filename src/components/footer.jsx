import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export default class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <footer id="footer">
          <div className="inner">
            <div className="content">
              <section>
                <h3>Thanks</h3>
                <p>
                  Thank you to everyone for your feedback, participation,
                  guidance and insight on this issue.{" "}
                </p>
              </section>
              <section>
                <h4>Suggestions</h4>
                <p>
                  This is YOUR site,so if you have suggestions on how to improve
                  it for you,please let us know! we do our best to keep up
                </p>

                <li>
                  <NavLink to="/suggestion">Make a suggestion</NavLink>
                </li>
              </section>
              <section>
                <h4>Contacts</h4>
                <ul className="plain">
                  <li>
                    <a href="https://www.facebook.com/IssatSo/">
                      <i className="icon fa-facebook"></i>Facebook
                    </a>
                  </li>
                  <li>
                    <a href="http://www.issatso.rnu.tn/fo/index.php">
                      <i className="icon fa-github">&nbsp;</i>Web site
                    </a>
                  </li>
                  <li>
                    <i className="icon fa-tel">&nbsp;</i>Phone: 73 382 656
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}
