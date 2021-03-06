import React, { Component } from "react";
import BoardService from "../../api/BoardService";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordError: false,

      username: "",
      email: "",
      emailcheck: "",
      password: "",
      passwordCheck: "",
      phonenumber: "",
      address: "",
    };

    this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);
    this.changePasswordCheckHandler =
      this.changePasswordCheckHandler.bind(this);
    this.changePhoneNumberHandler = this.changePhoneNumberHandler.bind(this);
    this.changeAddressHandler = this.changeAddressHandler.bind(this);
    this.createUser = this.createUser.bind(this);
    this.validateDuplicated = this.validateDuplicated.bind(this);
  }

  changeUsernameHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  changePasswordCheckHandler = (event) => {
    this.setState({ passwordCheck: event.target.value });
  };

  changePhoneNumberHandler = (event) => {
    this.setState({ phonenumber: event.target.value });
  };

  changeAddressHandler = (event) => {
    this.setState({ address: event.target.value });
  };

  validateDuplicated = (event) => {
    event.preventDefault();

    let email = {
      email: this.state.email,
    };

    BoardService.validateDuplicated(email)
      .then((res) => {
        // let result = res.data.code;
        // if(result===-101) {
        //   this.setState({emailcheck:false});
        // }
        // else {
        //   this.setState({emailcheck:true})
        // }
        console.log("사용가능 아이디");
        this.setState({ emailcheck: true });
      })
      .catch((error) => {
        console.log("중복된아이디: " + error);
        console.log(email);
        //this.setState({ emailcheck: false });
      });
  };

  createUser = (event) => {
    event.preventDefault();

    if (this.state.password !== this.state.passwordCheck) {
      this.setState({ passwordError: true });
      console.log(this.state.passwordError);
    } else {
      this.setState({ passwordError: false });
    }

    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      phonenumber: this.state.phonenumber,
      address: this.state.address,
    };

    console.log("user => " + JSON.stringify(user));
    BoardService.createUser(user).then((res) => {
      console.log("에러메세지=====" + res.data);
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
                    <label> username </label>
                    <input
                      type="text"
                      placeholder="username"
                      name="username"
                      className="form-control"
                      value={this.state.username}
                      onChange={this.changeUsernameHandler}
                    />
                  </div>

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
                    {this.state.emailcheck && (
                      <div style={{ color: "green" }}>
                        사용이 가능한 이메일입니다.
                      </div>
                    )}
                    {this.state.emailcheck && (
                      <div style={{ color: "red" }}>
                        이미 사용중인 이메일입니다.
                      </div>
                    )}
                    <button
                      disabled={!this.state.email}
                      onClick={this.validateDuplicated}
                    >
                      중복확인
                    </button>
                  </div>
                  <div className="form-group">
                    <label> Password </label>
                    <input
                      type="password"
                      placeholder="password"
                      name="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.changePasswordHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Password Check </label>
                    <input
                      type="password"
                      placeholder="password check"
                      name="passwordCheck"
                      className="form-control"
                      value={this.state.passwordCheck}
                      onChange={this.changePasswordCheckHandler}
                    />
                    {this.state.passwordError && (
                      <div style={{ color: "red" }}>
                        비밀번호가 일치하지 않습니다.
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label> Phone number </label>
                    <input
                      type="text"
                      placeholder="Phone number"
                      name="phonenumber"
                      className="form-control"
                      value={this.state.phonenumber}
                      onChange={this.changePhoneNumberHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Address </label>
                    <input
                      type="text"
                      placeholder="Address"
                      name="address"
                      className="form-control"
                      value={this.state.address}
                      onChange={this.changeAddressHandler}
                    />
                  </div>

                  <button
                    disabled={false} //true면 비활성화
                    className="btn btn-success"
                    onClick={this.createUser}
                  >
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
