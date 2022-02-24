import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormFields } from "../lib/hooksLib";
import "./EditProfile.css";
import userProfileImg from "../riya.jpeg"

export default function EditProfile() {
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  */

  const [validP, setValidP] = useState(0);
  const [validC, setValidC] = useState(0);
  const [validU, setValidU] = useState(0);
  const [validB, setValidB] = useState(0);

  const [user, setUser] = useFormFields({
    password: "",
    confirmPassword: "",
    username: "",
    bio: ""
  });

  function validateBio() {
    if (user.bio.length == 0) {
      document.getElementById("bioError").innerHTML = "Please enter a bio!";
      console.log("here");
      setValidB(0);
    }
    else if (user.bio.length > 100) {
      document.getElementById("bioError").innerHTML = "Bio length exceeds limit!";
      console.log("here 2");
      setValidB(0);
    }
    else {
      document.getElementById("bioError").innerHTML = "";
      setValidB(1);
    }
  }

  function validatePassword() {
    // add regex check
    // var re = ^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$;
    if (user.password.length == 0) {
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
    if (user.confirmPassword.length == 0) {
      document.getElementById("confirmPassError").innerHTML = "Please enter password again!";
      console.log("here");
      setValidC(0);
    }
    else if (user.confirmPassword != user.password) {
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
    if (user.username.length == 0) {
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

  function handleSubmit(event) {
    event.preventDefault();
    if((validC+validB+validP+validU) == 4) {
      window.location.href = "/Prof";
    } else if ((validB+validC+validP+validU) < 4) {
      document.getElementById("overallError").innerHTML = "Please fill all fields!";
    } else {
      document.getElementById("overallError").innerHTML = "";
    }
  }

  return (
    <div className="EditProfile">
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img src={userProfileImg} alt = "User Profile Image" width = "300"/>
        </div>
      <Form onSubmit={handleSubmit}>

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
        <Form.Group size="lg" controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            value={user.bio}
            onChange={setUser}
            onBlur={validateBio}
          />
          <div id = "bioError" style = {{"color": "red"}}></div>
          <small id="BioHelpBlock" class="form-text text-muted">
            Bio must be within 100 characters.
          </small>
        </Form.Group>
        <Button block size="lg" type="submit" >
          Submit Changes!
        </Button>
        <div id = "overallError" style = {{"color": "red"}}></div>
      </Form>
    </div>
  );
}
