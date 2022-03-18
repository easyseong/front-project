import React, { Component } from "react";
import BoardService from "../../api/BoardService";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };

    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  createUser = (event) => {
    event.preventDefault();
    let user = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log("user => " + JSON.stringify(user));
    BoardService.createUser(user).then((res) => {
      this.props.history.push("/");
    });
  };

  cancel() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Register</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> Email </label>
                    <input
                      type="text"
                      placeholder="email"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Password </label>
                    <input
                      type="text"
                      placeholder="password"
                      name="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.changePasswordHandler}
                    />
                  </div>

                  <button className="btn btn-success" onClick={this.createUser}>
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
