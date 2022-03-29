import "./login.css";
import {useRef} from "react";
import {loginCall} from "../../apiCalls";
import { useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
import {CircularProgress} from "@mui/material"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {user, isFetching,error,dispatch} = useContext(AuthContext);
    const history = useHistory();
    const handleClick = (e)=>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch);
        history.push("/home");
    }
    const redirect = () => {
        history.push("/register");
    }


    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">P u r d u e C i r c l e</h3>
                    <span className="loginDesc">Connect with others at Purdue through this brand-new social media app, designed just for Boilermakers!</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                        <input placeholder="Password" type="password" className="loginInput" ref={password} minLength="6"/>
                        <button className="loginButton">{isFetching ? <CircularProgress style={{ color: "white"}}/> : "Login"}</button>
                        {/*<span className="loginForgot">Forgot Password?</span>*/}
                        <button className="loginRegisterButton" onClick={redirect}>Register</button>
                        
                    </form>
                </div>
            </div>
        
        </div>
    )
}
