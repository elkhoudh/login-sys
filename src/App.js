import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import { Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <>
        <CssBaseline />
        <Route exact path="/" render={props => <Dashboard {...props} />} />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" component={Register} />
      </>
    );
  }
}

export default App;
