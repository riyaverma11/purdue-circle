import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import Feed from "./containers/Feed";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
         <Signup />
      </Route>
      <Route exact path="/profile">
         <Profile />
      </Route>
      <Route exact path="/feed">
         <Feed />
      </Route>
      <Route exact path="/logout">
         <Login />
      </Route>
      <Route exact path="/deleteProf">
         <Signup />
      </Route>
    </Switch>
  );
}

