import React, { Component } from "react";
import BoardService from "../../api/BoardService.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: localStorage.getItem("authenticatedUser") || "",
      password: "",
      token: localStorage.getItem("token") || "",
      hasLoginFailed: false,
      showSuccessMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  loginClicked() {
    console.log(
      "username= " + this.state.username + "   passowrd=" + this.state.password
    ); //이건 잘 넘어가나
    BoardService.executeJwtAuthenticationService(
      this.state.username,
      this.state.password
    )
      .then((response) => {
        this.setState({
          token: response.data.data.token,
        });

        BoardService.registerSuccessfulLoginForJwt(
          //username과 response.data.token을 사용해 사용자 확인
          this.state.username,
          this.state.token //토큰 어디서 받아오나? token: response.data.token인듯
        );
        this.props.history.push(`/welcome/${this.state.username}`); //성공하면 welcome페이지로 이동
      })
      .catch(() => {
        this.setState({ showSuccessMessage: false });
        this.setState({ hasLoginFailed: true });
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container">
          {this.state.hasLoginFailed && (
            <div className="alert alert-warning">Invalid Credentials</div>
          )}
          {this.state.showSuccessMessage && <div>Login Sucessful</div>}
          Email:{" "}
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-success" onClick={this.loginClicked}>
            로그인
          </button>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
