import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import BoardService from "../../api/BoardService";

class AuthenticatedRoute extends Component {
  render() {
    if (BoardService.isUserLoggedIn()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/sign/login" />;
    }
  }
}

export default AuthenticatedRoute;
