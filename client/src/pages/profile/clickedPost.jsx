import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Post from "../../components/post/Post";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ClickedPost() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [posts, setPosts] = useState([]);
    const [returnPost, setPost] = useState([]);
    var urlString = window.location.href;
    let lastIndex = urlString.lastIndexOf("/") + 1;
    const id = urlString.substring(lastIndex);

    useEffect(() => {
        const fetchPosts = async () => {
            const res= await axios.get(`/posts/${id}`);
            console.log(res.data);
            let postArray = [];
            postArray.push(res.data);
            setPosts(postArray);
            console.log(posts)
        };
        fetchPosts();
    }, []);

    return (
        <>
            <Topbar />
            <div className="profileRightBottom">
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </>
    );
}