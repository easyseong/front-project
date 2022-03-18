import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "./AuthenticationService.js";

class HeaderComponent extends Component {
  render() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

    console.log("===Headeromponent===");
    console.log(isUserLoggedIn);

    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="navbar-brand">I-ON COMMUNICATIONS</div>

          <ul className="navbar-nav">
            {isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/welcome/user_id">
                  Home
                </Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav navbar-collapse justify-content-end">
            {!isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/sign/login">
                  Login
                </Link>
              </li>
            )}
            {!isUserLoggedIn && (
              <li>
                <Link className="nav-link" to="/sign/register">
                  register
                </Link>
              </li>
            )}
            {isUserLoggedIn && (
              <li>
                <Link
                  className="nav-link"
                  to="/logout"
                  onClick={AuthenticationService.logout}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderComponent;