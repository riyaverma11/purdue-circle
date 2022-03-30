export default function Logout() {
  localStorage.setItem("isAuthenticated", 0);
  //console.log(isAuthenticated);
  //window.location.href = "/login";
}