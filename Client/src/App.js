import React, { Component } from "react";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UpdateUser from "./components/UpdateUser";
import Unauthorized from "./components/Unauthorized";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/profile" component={UpdateUser} />
            <Route path="/unauthorized" component={Unauthorized} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
