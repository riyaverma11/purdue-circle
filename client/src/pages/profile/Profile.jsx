import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { NotificationsActiveRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Profile() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});
	const username = useParams().username;
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
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src={
									user.coverPicture
										? PF + user.coverPicture
										: PF + "person/noCover.png"
								}
								alt=""
							/>
							<img
								className="profileUserImg"
								src={
									user.profilePicture
										? PF + user.profilePicture
										: PF + "person/noAvatar.png"
								}
								alt=""
							/>
						</div>
						{user.username}
						<div className="profileInfo">
							<h4 className="profileInfoName">Username</h4>
							<span className="profileInfoDesc">Bio</span>
							{/* TODO: Replace username with username variable here */}
							<Link
								to="/profile/username/edit"
								style={{ textDecoration: "none" }}
							>
								<Button variant="contained" className="editProfileBtn">
									Edit Profile
								</Button>
							</Link>
							{/* TODO: Write the condition to show Edit Profile/Follow/Unfollow button here */}
							{/* <Button variant="contained" className="editProfileBtn">
								Follow
							</Button>
							<Button variant="contained" className="editProfileBtn">
								Unfollow
							</Button> */}
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username} />
					</div>
				</div>
			</div>
		</>
	);
}
