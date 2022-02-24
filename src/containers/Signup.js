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

  function validateEmail() {
    if (user.email.length == 0) {
      document.getElementById("emailError").innerHTML = "Please enter an email address!";
      console.log("lol");
    }
    else if (!user.email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
      console.log("lol 2");
      document.getElementById("emailError").innerHTML = "Please enter a valid email address!";
    }
    else {
      document.getElementById("emailError").innerHTML = "";
    }
  }

  function validatePassword() {
    // add regex check
    // var re = ^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$;
    if (user.password.length == 0) {
      document.getElementById("passError").innerHTML = "Please enter password!";
      console.log("here");
    }
    else if (user.password.match()) {
      document.getElementById("passError").innerHTML = "Please enter a valid password!";
      console.log("here 2");
    }
    else {
      document.getElementById("passError").innerHTML = "";
    }
    // return (
    //   user.password.length > 8 && user.password.length <= 16 &&
    //   user.password === user.confirmPassword
    // );
  }

  function validateUsername() {
    return (
      user.username.length <= 16
    );
  }

  function validateAge() {
    return (
      user.age >= 17 && user.age <= 110
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
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
            Your password must be 8-16 characters long and have at least special character and must not contain spaces or emojis.
          </small>
        </Form.Group>
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={user.confirmPassword}
            required
            onChange={setUser}
          />
          <div id = "confirmPassError" style = {{"color": "red"}}></div>
        </Form.Group>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            value={user.username}
            required
            onChange={setUser}
          />
          <div id = "unameError" style = {{"color": "red"}}></div>
        </Form.Group>
        <Form.Group size="lg" controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="age"
            step="1.0"
            min={17}
            value={user.age}
            required
            onChange={setUser}
          />
          <div id = "ageError" style = {{"color": "red"}}></div>
        </Form.Group>
        <Button block size="lg" type="submit">
          Sign Up!
        </Button>
      </Form>
    </div>
  );
}