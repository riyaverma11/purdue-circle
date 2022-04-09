import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Register from "./pages/register/Register";
import Logout from "./pages/logout/Logout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "./components/globalStyle";
import { lightTheme, darkTheme } from "./components/Theme"

function App() {
	const [theme, setTheme] = useState('light');
	const themeToggler = () => {
	  theme === 'light' ? setTheme('dark') : setTheme('light')
  	}
	
	return (
		<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
		<>
		<GlobalStyles/>
		<button onClick={themeToggler}>Switch Theme</button>
		<Router>
			<Switch>
				<Route exact path="/">
					<Register />
				</Route>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/register">
					<Register />
				</Route>
				<Route path="/home">
					<Home />
				</Route>
				<Route exact path="/profile/:username">
					<Profile />
				</Route>
				<Route exact path="/profile/:username/edit">
					<EditProfile />
				</Route>

				<Route path="/logout">
					<Logout />
				</Route>
			</Switch>
		</Router>
		</>
    </ThemeProvider>
	);
}

export default App;
