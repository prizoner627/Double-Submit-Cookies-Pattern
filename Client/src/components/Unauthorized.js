import React, { Component } from "react";
import "../styles/Login.css";

class Unauthorized extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="col-lg-12 col-sm-12 ">
            <h1 className="display-4 top-margin">Synchronizer Token Pattern</h1>
            <h1 className="display-5 ">Unauthorized Access</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default Unauthorized;
