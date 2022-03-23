import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.js";


function App() {

  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Route exact path="/"> 
        {user ? <Home/> : <Register/>}
        </Route>
      <Switch>
        <Route exact path="/register"> 
        <Register/>
        </Route>
        <Route exact path="/login"> 
        <Login/>
        </Route>
        <Route exact path="/home"> 
        <Home/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
