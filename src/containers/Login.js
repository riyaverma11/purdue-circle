import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

export default function Login() {
  const [validE, setValidE] = useState(0);
  const [validP, setValidP] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  localStorage.setItem("isAuthenticated", 0);

  function validateEmail() {
    if (email.length === 0) {
      document.getElementById("emailError").innerHTML = "Please enter an email address!";
      console.log("lol");
      setValidE(0);
    }
    else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
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
    if (password.length === 0) {
      document.getElementById("passError").innerHTML = "Please enter password!";
      console.log("here");
      setValidP(0);
    }
    else if (!((password.length >= 8 && password.length <= 16) && (password.match(/(?=.*[^a-zA-Z0-9])/) && !(/\s/g.test(password))))) {
      document.getElementById("passError").innerHTML = "Please enter a valid password!";
      console.log("here 2");
      setValidP(0);
    }
    else {
      document.getElementById("passError").innerHTML = "";
      setValidP(1);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if((validE + validP) === 2 ) {
      localStorage.setItem("isAuthenticated", 1);
      window.location.href = "/timeline";
    } else if((validE+validP) < 2) {
      document.getElementById("overallError").innerHTML = "Please fill all fields!";
    } else {
      document.getElementById("overallError").innerHTML = "";
    }

  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={validateEmail}
          />
          <div id = "emailError" style = {{"color": "red"}}></div>
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
          />
          <div id = "passError" style = {{"color": "red"}}></div>
        </Form.Group>
        <Button block size="lg" type="submit">
          Login
        </Button>
        <div id = "overallError" style = {{"color": "red"}}></div>
      </Form>
    </div>
  );
}