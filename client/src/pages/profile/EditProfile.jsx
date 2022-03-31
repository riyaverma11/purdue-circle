import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import { Button, TextField, InputLabel } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router";

export default function EditProfile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});
	const username = useParams().username; //currently not working lol: not the username

	/*var urlString = window.location.href;
	let lastIndex = urlString.lastIndexOf("/") + 1;
	const username = urlString.substring(lastIndex);*/

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?username=${username}`);
			setUser(res.data);
		};
		fetchUser();
	}, [username]);

	const [validU, setValidU] = useState(0);

	const usernameInput = useRef();
	const bioInput = useRef();

	function validateUsername() {
		if (usernameInput.current.value.length === 0) {
			document.getElementById("unameError").innerHTML =
				"Please enter username!";
			console.log("no username provided");
			setValidU(0);
		} else if (
			!(
				usernameInput.current.value.length <= 16 &&
				!/\s/g.test(usernameInput.current.value)
			)
		) {
			document.getElementById("unameError").innerHTML =
				"Please enter valid username!";
			console.log("username less than 16 char");
			setValidU(0);
		} else {
			document.getElementById("unameError").innerHTML = "";
			console.log(usernameInput.current.value);
			setValidU(1);
		}
	}
	const handleDelete = async e => {
		e.preventDefault();
	}

	return (
		<>
			<Topbar />
			<div className="profile">
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src={
									user.coverPicture
										? PF + user.coverPicture
										//: PF + "person/noCover.png"
										: PF + "person/purdueCover.jpeg"
								}
								alt=""
							/>
							<img
								className="profileUserImg"
								src={
									user.profilePicture
										? PF + user.profilePicture
										//: PF + "person/noAvatar.png"
										: PF + "person/riya.png"
								}
								alt=""
							/>
						</div>
						{/* {user.username} */}
						<div className="profileInfo">
							<Button
								variant="contained"
								className="editProfileBtn"
								component="label"
							>
								Upload New Image
								<input type="file" hidden />
							</Button>
							<TextField
								id="outlined-basic"
								label="Username"
								variant="outlined"
								inputRef={usernameInput}
								onBlur={validateUsername}
								style={{ marginTop: "3vh" }}
							/>
							<div id="unameError" style={{ color: "red" }}></div>
							<small className="inputDesc">
								Username length is restricted to 16 characters.
							</small>
							{/* <span className="profileInfoDesc">Bio</span> */}
							<TextField
								id="outlined-multiline-static"
								label="Bio"
								multiline
								rows={4}
								inputRef={bioInput}
							/>
							{/* <div id="unameError" style={{ color: "red" }}></div>
							<InputLabel style={{ textAlign: "center" }}>
								Username length is restricted to 16 characters.
                            </InputLabel> */}

							<div className="spacer"></div>

							{/* TODO: Implement the functionality of the save changes button */}
							<Button variant="contained" className="editProfileBtn">
								Save Changes
							</Button>
							<Button variant="contained" className="deleteProfileBtn" onClick={handleDelete}>
								Delete Profile
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
