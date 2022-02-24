import "./register.css"

export default function Register() {
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">PurdueCircle</h3>
                    <span className="registerDesc">Connect with others at Purdue</span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <input placeholder="Email" className="RegisterInput"/>
                        <input placeholder="Username" className="RegisterInput"/>
                        <input placeholder="Password" className="RegisterInput"/>
                        <input placeholder="Confirm Password" className="RegisterInput"/>
                        <input placeholder="Age" className="RegisterInput"/>
                        <button className="RegisterButton">Sign In</button>
                        <button className="registerLoginButton">Log In</button>

                    </div>
                </div>
            </div>
        
        </div>
    )
}
