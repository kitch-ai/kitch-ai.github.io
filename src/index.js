import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main";
import MeetingsMain from "./MeetingsMain";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/callback">
          <Main />
        </Route>
        <Route path="/">
          <MeetingsMain />
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
