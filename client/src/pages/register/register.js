import "./register.css"

export default function Register() {
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">PurdueCircle</h3>
                    <span className="loginDesc">Connect with others at Purdue</span>
                </div>
                <div className="loginRight">
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput"/>
                        <input placeholder="Username" className="loginInput"/>
                        <input placeholder="Password" className="loginInput"/>
                        <input placeholder="Confirm Password" className="loginInput"/>
                        <input placeholder="Age" className="loginInput"/>
                        <button className="loginButton">Sign In</button>
                        <button className="loginRegisterButton">Log In</button>

                    </div>
                </div>
            </div>
        
        </div>
    )
}
