import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Logout from "./containers/Logout";
import EditProfile from "./containers/EditProfile";
import Feed from "./containers/Feed";
import Profile from "./containers/Profile";
import DeleteProfile from "./containers/DeleteProfile";

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
      <Route exact path="/editProf">
         <EditProfile />
      </Route>
      <Route exact path="/feed">
         <Feed />
      </Route>
      <Route exact path="/logout">
         <Logout />
      </Route>
      <Route exact path="/deleteProf">
         <DeleteProfile />
      </Route>
      <Route exact path="/Prof">
         <Profile />
      </Route>
    </Switch>
  );
}

