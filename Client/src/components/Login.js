import React, { Component } from "react";
import "../styles/Login.css";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    csrfToken: ""
  };

  login = e => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/login",
        {
          username: this.state.email,
          password: this.state.password
        },
        {
          withCredentials: true
        }
      )
      .then(result => {
        console.log(result.data);
        if (result.data === "OK") {
          console.log("success");
          this.props.history.push("/profile");
        }
        if (result.data === "Invalid Credentials") {
          this.setState({ error: result.data });
        }
        console.log(result.data);
      });

    console.log(this.state);
  };
  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="col-lg-12 col-sm-12 ">
            <h1 className="display-4 top-margin">
              Double Submit Token Pattern
            </h1>

            <div className="d-flex justify-content-center ">
              <form onSubmit={this.login}>
                <h3 className="font-weight-light small-margin">LogIn</h3>

                <div className="form-group">
                  <input
                    required
                    onChange={this.handleChange}
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    onChange={this.handleChange}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="form-group onError">{this.state.error}</div>
                <button className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
