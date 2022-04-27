import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./profile.css";
import { AuthContext } from "../../context/AuthContext";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import RightBar from "../../components/rightBar/RightBar";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
//import { useParams } from "react-router";

export default function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});
	const { user: currentUser, dispatch } = useContext(AuthContext);
	//const username = useParams().username;

	var urlString = window.location.href;
	let lastIndex = urlString.lastIndexOf("/") + 1;
	const username = urlString.substring(lastIndex);
	console.log("username")
	console.log(username)
	console.log("User = ");
	console.log(user);
	console.log("CurrentUser = ")
	console.log(currentUser);

	useEffect(() => {
		const fetchUser = async () => {
		  const res = await axios.get(`/users?username=${username}`);
		  setUser(res.data);
		};
		fetchUser();
	  }, [username]);
	
	let btnElem
	if (username == currentUser.username) {
		btnElem = (<Link to={`/profile/${user.username}/edit`}>
		<Button variant="contained" className="editProfileBtn">
			Edit Profile
		</Button>
	</Link>)
	}

    let btnElem2
	if (username == currentUser.username) {
		btnElem2 = (<Link to={`/profile/${user.username}/savedPosts`}>
		<Button variant="contained" className="editProfileBtn">
			Saved Posts
		</Button>
	</Link>)
	}

	let btnElem3
	if (username == currentUser.username) {
		btnElem3 = (<Link to={`/profile/${user.username}/interactions`}>
		<Button variant="contained" className="editProfileBtn">
			Post Interactions
		</Button>
	</Link>)
	}

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?username=${username}`);
			setUser(res.data);
		};
		fetchUser();
	}, [username]);

	return (
		<>
			<Topbar />
			<div className="profile">
				<div className="profileRight" role="main" aria-label="contains the users and topics followed">
					<div className="profileRightTop" role="main" aria-label="contains the cover photo, profile photo, bio, username, and edit profile button">
						<div className="profileCover" aria-label="">
					
							<img
								className="profileCoverImg"
								src={
									user.coverPicture
										? user.coverPicture
										: //: PF + "person/noCover.png"
										  PF + "person/purdueCover.jpeg"
								}
								alt={user.username + "'s cover photo"}
							/>
						
							{(user.username!==user.email) && (
							<img
								className="profileUserImg"
								src={
									user.profilePicture
										? PF + "person/"+ user.profilePicture
										: PF + "person/noAvatar.png"
										//:  PF + "person/riya.png"
								}
								alt={user.username + "'s profile photo"}
							/>
							)}
						</div>

						<div className="profileInfo">
							<h4 className="profileInfoName">{user.username}</h4>
							<span className="profileInfoDesc">{user.desc}</span>
							{/* TODO: Replace username with username variable here */}

							<div className="spacer">{btnElem}        {btnElem2}        {btnElem3}</div>


							{/* TODO: Write the condition to show Edit Profile/Follow/Unfollow button here */}
							{/* <Button variant="contained" className="editProfileBtn">
								Follow
							</Button>
							<Button variant="contained" className="editProfileBtn">
								Unfollow
							</Button> */}
						</div>
					</div>
					<div className="profileRightBottom" role="main" aria-label="has the feed of the user and the rightbar">
						<Feed username={username} />
						<RightBar user={user} />
					</div>
				</div>
			</div>
		</>
	);
}
