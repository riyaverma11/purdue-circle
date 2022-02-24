import React from "react";

export default function Logout() {
  localStorage.setItem("isAuthenticated", 0);
  window.location.href = "/login";
}