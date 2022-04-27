import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import { Button, TextField, InputLabel } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Post from "../../components/post/Post";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Interactions() {
	const PF = process.env.REACT_APP_PUBLIC_FOLDER;
	const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
	const history = useHistory();

	var urlString = window.location.href;
	let lastIndex = urlString.lastIndexOf("/") + 1;
	var urlString2 = urlString.substring(0, lastIndex - 1);
	let lastIndex2 = urlString2.lastIndexOf("/") + 1;
	const username = urlString2.substring(lastIndex2);
	console.log("username=");
	console.log(username);

    

	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		const res = await axios.get(`/users?username=${username}`);
	// 		setUser(res.data);
	// 	};
	// 	fetchUser();
	// }, [username]);
    
    


    useEffect(() => {
        const fetchPosts = async () => {
            const res= await axios.get("/users/interactions/" +username);
            console.log("here" + res.data);
            let postArray = [];
            for(let i = res.data.length-1; i>=0; i--){
                const post = res.data[i]; 
                postArray.push(post);
            }
            setPosts(postArray);
            /*setPosts(
                postArray.sort((p1, p2) => {
                  return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
              );*/
            
        }
        fetchPosts();
    }, [username]);
    
    

    return (
        <>
            <Topbar />
            <div className="feedWrapper">
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </>
    );
}