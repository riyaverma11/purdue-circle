import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Logout from "./pages/logout/Logout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
   let isAuthenticated = localStorage.getItem("isAuthenticated");
  //const {user} = useContext(AuthContext)
  return (
    <Router>
    <Switch>
      <Route exact path="/">
       <Register />
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/register">
        <Register/>
      </Route>
      <Route path="/home">
          {isAuthenticated ? <Redirect to ="/home" /> : <Login/>}
          <Home/> 
      </Route>
      <Route path="/profile/:username">
        <Profile />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>

    </Switch>
  </Router>
  );
}

export default App;
