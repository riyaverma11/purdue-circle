import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormFields } from "../lib/hooksLib";
import "./Signup.css";

export default function Signup() {
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  */

  let emailError = "";
  const [user, setUser] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    age: 0
  });

  const [validE, setValidE] = useState(0);
  const [validP, setValidP] = useState(0);
  const [validC, setValidC] = useState(0);
  const [validU, setValidU] = useState(0);
  const [validA, setValidA] = useState(0);

  function validateEmail() {
    if (user.email.length === 0) {
      document.getElementById("emailError").innerHTML = "Please enter an email address!";
      console.log("lol");
      setValidE(0);
    }
    else if (!user.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      console.log("lol 2");
      setValidE(0);
      document.getElementById("emailError").innerHTML = "Please enter a valid email address!";
    }
    else {
      document.getElementById("emailError").innerHTML = "";
      setValidE(1);
    }
  }

  function validatePassword() {
    // add regex check
    // var re = ^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$;
    if (user.password.length === 0) {
      document.getElementById("passError").innerHTML = "Please enter password!";
      console.log("here");
      setValidP(0);
    }
    else if (!((user.password.length >= 8 && user.password.length <= 16) && (user.password.match(/(?=.*[^a-zA-Z0-9])/) && !(/\s/g.test(user.password))))) {
      document.getElementById("passError").innerHTML = "Please enter a valid password!";
      console.log("here 2");
      setValidP(0);
    }
    else {
      document.getElementById("passError").innerHTML = "";
      setValidP(1);
    }
  }

  function validateConfirmPassword() {
    if (user.confirmPassword.length === 0) {
      document.getElementById("confirmPassError").innerHTML = "Please enter password again!";
      console.log("here");
      setValidC(0);
    }
    else if (user.confirmPassword !== user.password) {
      document.getElementById("confirmPassError").innerHTML = "Please enter matching password!";
      console.log("here 2");
      setValidC(0);
    }
    else {
      document.getElementById("confirmPassError").innerHTML = "";
      setValidC(1);
    }
  }

  function validateUsername() {
    if (user.username.length === 0) {
      document.getElementById("unameError").innerHTML = "Please enter username!";
      console.log("here");
      setValidU(0);
    }
    else if (!((user.username.length <= 16) && !(/\s/g.test(user.username)))) {
      document.getElementById("unameError").innerHTML = "Please enter valid username!";
      console.log("here 2");
      setValidU(0);
    }
    else {
      document.getElementById("unameError").innerHTML = "";
      setValidU(1);
    }
  }

  function validateAge() {
    if (user.age.length === 0) {
      document.getElementById("ageError").innerHTML = "Please enter age!";
      console.log("here");
      setValidA(0);
    }
    else if (!(user.age >= 17 && user.age <= 110 && !(isNaN(user.age)))) {
      document.getElementById("ageError").innerHTML = "Please enter a valid age!";
      console.log("here 2");
      setValidA(0);
    }
    else {
      document.getElementById("ageError").innerHTML = "";
      setValidA(1);;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if((validA+validC+validE+validP+validU) === 5) {
      window.location.href = "/login";
    } else if ((validA+validC+validE+validP+validU) < 5) {
      document.getElementById("overallError").innerHTML = "Please fill all fields!";
    } else {
      document.getElementById("overallError").innerHTML = "";
    }
    // console.log(user);
  }

  return (
    <div className="Signup">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            placeholder="name@example.com"
            value={user.email}
            onChange={setUser}
            onBlur={validateEmail}
          />
          <div id = "emailError" style = {{"color": "red"}}></div>
          {/* <div id="emailError"></div> */}
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={user.password}
            onChange={setUser}
            onBlur={validatePassword}
          />
          <div id = "passError" style = {{"color": "red"}}></div>
          <small id="passwordHelpBlock" class="form-text text-muted">
            Your password must be 8-16 characters long and have at least special character and must not contain spaces.
          </small>
        </Form.Group>
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={user.confirmPassword}
            onChange={setUser}
            onBlur={validateConfirmPassword}
          />
          <div id = "confirmPassError" style = {{"color": "red"}}></div>
        </Form.Group>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            value={user.username}
            onChange={setUser}
            onBlur={validateUsername}
          />
          <div id = "unameError" style = {{"color": "red"}}></div>
          <small id="unameHelpBlock" class="form-text text-muted">
            Username length is restricted to 16 characters.
          </small>
        </Form.Group>
        <Form.Group size="lg" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="age"
            step="1.0"
            value={user.age}
            onChange={setUser}
            onBlur={validateAge}
          />
          <div id = "ageError" style = {{"color": "red"}}></div>
          <small id="ageHelpBlock" class="form-text text-muted">
            User must be atleast 17 years old.
          </small>
        </Form.Group>
        <Button block size="lg" type="submit">
          Sign Up!
        </Button>
        <div id = "overallError" style = {{"color": "red"}}></div>
      </Form>
    </div>
  );
}