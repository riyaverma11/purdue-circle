import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import "./register.css";

export default function Register() {
	const email = useRef();
	const username = useRef();
	const password = useRef();
	const confirmPassword = useRef();
	const age = useRef();
	const history = useHistory();

	const [validE, setValidE] = useState(0);
	const [validP, setValidP] = useState(0);
	const [validC, setValidC] = useState(0);
	const [validU, setValidU] = useState(0);
	const [validA, setValidA] = useState(0);

	function validateEmail() {
		if (email.current.value.length === 0) {
			document.getElementById("emailError").innerHTML =
				"Please enter an email address!";
			console.log("lol");
			setValidE(0);
		} else if (
			!String(email.current.value).match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
		) {
			console.log("lol 2");
			setValidE(0);
			document.getElementById("emailError").innerHTML =
				"Please enter a valid email address!";
		} else {
			document.getElementById("emailError").innerHTML = "";
			setValidE(1);
		}
	}
	function validatePassword() {
		// add regex check
		// var re = ^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$;
		if (password.current.value.length === 0) {
			document.getElementById("passError").innerHTML = "Please enter password!";
			console.log("here");
			setValidP(0);
		} else if (
			!(
				password.current.value.length >= 8 &&
				password.current.value.length <= 16 &&
				(password.current.value.match(/(?=.*[^a-zA-Z0-9])/) &&
					!/\s/g.test(password.current.value))
			)
		) {
			document.getElementById("passError").innerHTML =
				"Please enter a valid password!";
			console.log("here 2");
			setValidP(0);
		} else {
			document.getElementById("passError").innerHTML = "";
			setValidP(1);
		}
	}
	function validateConfirmPassword() {
		if (confirmPassword.current.value.length === 0) {
			document.getElementById("confirmPassError").innerHTML =
				"Please enter password again!";
			console.log("here");
			setValidC(0);
		} else if (confirmPassword.current.value !== password.current.value) {
			document.getElementById("confirmPassError").innerHTML =
				"Please enter matching password!";
			console.log("here 2");
			setValidC(0);
		} else {
			document.getElementById("confirmPassError").innerHTML = "";
			setValidC(1);
		}
	}
	function validateUsername() {
		if (username.current.value.length === 0) {
			document.getElementById("unameError").innerHTML =
				"Please enter username!";
			console.log("here");
			setValidU(0);
		} else if (
			!(
				username.current.value.length <= 16 &&
				!/\s/g.test(username.current.value)
			)
		) {
			document.getElementById("unameError").innerHTML =
				"Please enter valid username!";
			console.log("here 2");
			setValidU(0);
		} else {
			document.getElementById("unameError").innerHTML = "";
			setValidU(1);
		}
	}
	function validateAge() {
		if (age.current.value.length === 0) {
			document.getElementById("ageError").innerHTML = "Please enter age!";
			console.log("here");
			setValidA(0);
		} else if (
			!(
				age.current.value >= 17 &&
				age.current.value <= 110 &&
				!isNaN(age.current.value)
			)
		) {
			document.getElementById("ageError").innerHTML =
				"Please enter a valid age!";
			console.log("here 2");
			setValidA(0);
		} else {
			document.getElementById("ageError").innerHTML = "";
			setValidA(1);
		}
	}

	const handleClick = async e => {
		e.preventDefault();
		if (validA + validC + validE + validP + validU !== 5) {
			document.getElementById("overallError").innerHTML =
				"Please fill all fields!";
		} else {
			const user = {
				//TODO check to see if this is everything user needs
				email: email.current.value,
				username: username.current.value,
				password: password.current.value,
				age: age.current.value
			};
			try {
				const res = await axios.post("/auth/register", user);
				history.push("/login");
			} catch (err) {
                    ////// how to distingush between types of error???
               
               console.log("invalid username or password")
			}
		}
	};

	const redirect = () => {
		history.push("/login"); //// change later to login?
	};

	return (
		<div className="register">
			<div className="registerWrapper">
				<div className="registerLeft">
					<h3 className="registerLogo">P u r d u e C i r c l e</h3>
					<span className="registerDesc">
						Connect with others at Purdue through this brand-new social media
						app, designed just for Boilermakers!
					</span>
				</div>
				<div className="registerRight">
					<form className="registerBox" onSubmit={handleClick}>
						<input
							placeholder="name@example.com"
							ref={email}
							className="RegisterInput"
							type="email"
							onBlur={validateEmail}
						/>
						<div id="emailError" style={{ color: "red" }}></div>
						<input
							placeholder="Username"
							ref={username}
							className="RegisterInput"
							onBlur={validateUsername}
						/>
						<div id="unameError" style={{ color: "red" }}></div>
						<small style={{ textAlign: "center" }}>
							Username length is restricted to 16 characters.
						</small>
						                    
						<input
							placeholder="Password"
							ref={password}
							className="RegisterInput"
							type="password"
							onBlur={validatePassword}
						/>
						<div id="passError" style={{ color: "red" }}></div>
						<small style={{ textAlign: "center" }}>
							Your password must be 8-16 characters long and have at least
							special character and must not contain spaces.
						</small>
						<input
							placeholder="Confirm Password"
							ref={confirmPassword}
							className="RegisterInput"
							type="password"
							onBlur={validateConfirmPassword}
						/>
						<div id="confirmPassError" style={{ color: "red" }}></div>
						<input
							placeholder="Age"
							ref={age}
							className="RegisterInput"
							onBlur={validateAge}
						/>
						<div id="ageError" style={{ color: "red" }}></div>
						                    
						<small style={{ textAlign: "center" }}>
							User must be atleast 17 years old.
						</small>
						<button className="RegisterButton" type="submit">
							Sign Up
						</button>
						<button className="registerLoginButton" onClick={redirect}>
							Already have an account? Log In
						</button>
						<div id="overallError" style={{ color: "red" }}></div>
					</form>
				</div>
			</div>
		</div>
	);
}
