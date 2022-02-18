//Renders the homepage assuming that the user is not logged in yet

import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <h1>P u r d u e C i r c l e</h1>
        <p className="text-muted">A social media app dedicated to Purdue Students!</p>
      </div>
    </div>
  );
}