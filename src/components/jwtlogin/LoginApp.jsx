import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute.jsx";
import LoginComponent from "./LoginComponent.jsx";
import ErrorComponent from "./ErrorComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import LogoutComponent from "./LogoutComponent.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";
import TestComponent from "./TestComponent.jsx";
import { withRouter } from "react-router";
import ListBoardComponent from "./ListBoardComponent.jsx";
import RegisterComponent from "./RegisterComponent.jsx";

class LoginApp extends Component {
  render() {
    const HeaderWithRouter = withRouter(HeaderComponent);

    return (
      <div className="TodoApp">
        <Router>
          <div>
            <HeaderWithRouter />
            <Switch>
              <Route path="/" exact component={ListBoardComponent} />
              <Route path="/sign/login" component={LoginComponent} />
              <Route path="/sign/register" component={RegisterComponent} />

              <AuthenticatedRoute
                path="/welcome/:name"
                component={WelcomeComponent}
              />
              <AuthenticatedRoute path="/logout" component={LogoutComponent} />
              <AuthenticatedRoute path="/test" component={TestComponent} />
              <Route component={ErrorComponent} />
            </Switch>
            <FooterComponent />
          </div>
        </Router>
      </div>
    );
  }
}

export default LoginApp;
