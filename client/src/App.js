import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import {
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"> 
        <Home/>
        </Route>
        <Route exact path="/login"> 
        <Login/>
        </Route>
        <Route exact path="/register"> 
        <Register/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
