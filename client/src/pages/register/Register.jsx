import {useRef} from "react"
import axios from "axios"
import { useHistory } from "react-router-dom";
import "./register.css"

export default function Register() {
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const age = useRef();
    const history = useHistory();
    
    const handleClick = async (e) =>{
        e.preventDefault();
        if (confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Passwords don't match!");
        } else {
            const user = {
                //TODO check to see if this is everything user needs
                email: email.current.value,
                username: username.current.value,
                password: password.current.value,
                age: age.current.value,
            }
            try {
                const res = await axios.post("/auth/register", user);
                history.push("/home");
            } catch (err) {
                console.log(err);
            }
        }
    }
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">P u r d u e C i r c l e</h3>
                    <span className="registerDesc">Connect with others at Purdue through this brand-new social media app, designed just for Boilermakers!</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleClick}>
                        <input placeholder="Email" required ref={email} className="RegisterInput" type="email"/>
                        <input placeholder="Username" required ref={username} className="RegisterInput"/>
                        <input placeholder="Password" required ref={password} className="RegisterInput" type="password"/>
                        <input placeholder="Confirm Password" required ref={confirmPassword} className="RegisterInput" type="password"/>
                        <input placeholder="Age" required ref={age} className="RegisterInput"/>
                        <button className="RegisterButton" type="submit">Sign Up</button>
                        <button className="registerLoginButton">Log In</button>

                    </form>
                </div>
            </div>
        
        </div>
    )
}
