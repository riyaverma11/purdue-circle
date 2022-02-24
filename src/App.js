//import logo from './logo.svg';
import React, { useState} from "react";
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import './App.css';
import Routes from "./Routes";

function App() {
  let isAuthenticated = localStorage.getItem("isAuthenticated");
  let NavBar;
  if (isAuthenticated == 1) {
    NavBar = (<>
            <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            P u r d u e C i r c l e
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/feed">
              <Nav.Link>Feed</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/editProf">
              <Nav.Link>Edit Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/logout">
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/deleteProf">
              <Nav.Link>Delete Profile</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Prof">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
    </>)
  }
  else {
    NavBar = (<>
            <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            P u r d u e C i r c l e
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <LinkContainer to="/signup">
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
    </>)
  }
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        {NavBar}
      </Navbar>
      <Routes />
    </div>
  );
}


export default App;
