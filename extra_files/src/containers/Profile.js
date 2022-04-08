import React from "react";
import Form from "react-bootstrap/Form";
import { useFormFields } from "../lib/hooksLib";
import "./Profile.css";
import userProfileImg from "../riya.jpeg"

export default function Profile() {
  /*
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  */
  
  const [user, setUser] = useFormFields({
    username: "",
    age: 0,
    bio: ""
  });

  return (
    <div className="Profile">
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <img src={userProfileImg} alt = "User Profile Image" width="300"/>
        </div>
        <br></br>

        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Form.Label>Username:&nbsp;</Form.Label>
        <Form.Label>riyaaverma</Form.Label>
        </div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Form.Label>Bio:&nbsp;</Form.Label>
        <Form.Label>CS influencer. Grateful for Bhawin and Aayush</Form.Label>
        </div>
    </div>
  );
}