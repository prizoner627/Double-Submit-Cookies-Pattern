import React, { Component } from "react";
import "../styles/Login.css";
import axios from "axios";
import Cookies from "js-cookie";

class UpdateUser extends Component {
  state = {
    message: "",
    sessionCookie: "",
    csrfTokenCookie: "",
    logs: ""
  };

  //get cookies from browser
  componentDidMount() {
    const sessionCookie = Cookies.get("sessionCookie");
    this.setState({
      sessionCookie
    });
    console.log(sessionCookie);
    const csrfTokenCookie = Cookies.get("csrfTokenCookie");
    this.setState({
      csrfTokenCookie
    });
    console.log(csrfTokenCookie);
  }
  update = e => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/message",
        {
          message: this.state.message,
          csrfToken: this.state.csrfTokenCookie
        },
        {
          withCredentials: true
        }
      )
      .then(result => {
        if (result.data === "Message Recieved with Valid CSRF Token") {
          this.setState({ logs: result.data });
        }
        if (result.data === "Invalid CSRF Token") {
          this.setState({ logs: result.data });
        }
        console.log(result.data);
        console.log(result);
      });
    console.log(this.state);
  };

  logout = () => {
    console.log("clicked");
    axios
      .post("http://localhost:4000/logout", {
        withCredentials: true
      })
      .then(result => {
        if (result.data === "logout") {
          this.props.history.push("/");
        }
        console.log(result);
      });
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

            <div className="d-flex justify-content-center">
              <form onSubmit={this.update}>
                <h3 className="font-weight-light small-margin">Send Message</h3>

                <div className="form-group">
                  <input
                    required
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="message"
                    placeholder="message"
                  />
                </div>
                <div className="form-group">
                  <input
                    required
                    type="hidden"
                    className="form-control"
                    id="token"
                    value={this.state.csrfTokenCookie}
                  />
                </div>
                <div className="form-group onError">{this.state.logs}</div>

                <button className="btn btn-primary">Send</button>
                <button className="btn btn-danger" onClick={this.logout}>
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateUser;
