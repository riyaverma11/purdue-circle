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
  const [user, setUser] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    age: 0
  });

  function validateEmail() {
    return (
      user.email.length > 0 
      //user.password.length > 8 && user.password.length <= 16 && 
      //user.confirmPassword.length > 8 && user.confirmPassword.length <= 16 &&
      //user.password.length === user.confirmPassword.length &&
      //user.username.length <= 16
      );
  }

  function validatePassword() {
    return (
      user.password.length > 8 && user.password.length <= 16 &&
      user.confirmPassword.length > 8 && user.confirmPassword.length <= 16 &&
      user.password.length === user.confirmPassword.length
    );
  }

  function validateUsername() {
    return (
      user.username.length <= 16
    );
  }

  function validateAge() {
    return (
      user.age >= 17
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Signup">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            required
            value={user.email}
            onChange={setUser}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={user.password}
            required
            onChange={setUser}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={user.confirmPassword}
            required
            onChange={setUser}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            value={user.username}
            required
            onChange={setUser}
          />
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
        </Form.Group>
        <Button block size="lg" type="submit" 
        disabled={!validateEmail() && !validatePassword() && !validateUsername() && !validateAge()}>
          Sign Up!
        </Button>
      </Form>
    </div>
  );
}