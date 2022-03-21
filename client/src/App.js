import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Route exact path="/"> 
        <Register/>
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
