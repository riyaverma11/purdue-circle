import React from "react";

export default function DeleteProfile() {
  localStorage.setItem("isAuthenticated", 0);
  window.location.href = "/signup";
}