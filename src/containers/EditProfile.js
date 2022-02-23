import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormFields } from "../lib/hooksLib";
import "./EditProfile.css";
import userProfileImg from "../defaultPicture.jpg"

export default function EditProfile() {
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  */
  const [user, setUser] = useFormFields({
    password: "",
    confirmPassword: "",
    username: "",
    age: 0,
    bio: ""
  });

  function validateBio() {
      return (
          user.bio.length > 0 && user.bio.length < 100
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
    <div className="EditProfile">
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img src={userProfileImg} alt = "User Profile Image"/>
        </div>
      <Form onSubmit={handleSubmit}>

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
            requierd
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
        <Form.Group size="lg" controlId="Bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            autoFocus
            type="bio"
            value={user.bio}
            onChange={setUser}
          />
        </Form.Group>
        <Button block size="lg" type="submit" 
        disabled={!validateBio() && !validatePassword() && !validateUsername() && !validateAge()}>
          Submit Changes!
        </Button>
      </Form>
    </div>
  );
}