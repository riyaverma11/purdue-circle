import "./share.css";
import { PermMedia, Label, Cancel, BookmarkAdd } from "@mui/icons-material";
//import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
    const [checked, setChecked] = useState(false);

    const handleChange = () => {
        setChecked(!checked);
    };

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);

    const submitHandler = async e => {
        e.preventDefault();
        console.log("User id = " + user._id);
        let finalUserID = user._id;
        if (checked) {
            finalUserID = "625667cd7a5eaf94ffe854ad";
        }
        const newPost = {
            userId: finalUserID,
            desc: desc.current.value
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("/upload", data);
            } catch (err) {}
        }
        try {
            await axios.post("/posts", newPost);
            window.location.reload();
        } catch (err) {}
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={
                            user.profilePicture
                                ? user.profilePicture
                                : //: PF + "person/noAvatar.png"
                                  PF + "person/riya.png"
                        }
                        alt=""
                    />
                    <input
                        placeholder={"What's on your mind " + user.username + "?"}
                        className="shareInput"
                        ref={desc}
                    />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={e => setFile(e.target.files[0])}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Topic</span>
                        </div>
                        <div className="shareOption">
                            <BookmarkAdd htmlColor="DarkGray" className="shareIcon" />
                            <span className="shareOptionText">Save Post</span>
                        </div>
                        <div className="shareOption">
                            {/* <Label htmlColor="green" className="shareIcon" /> */}
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={handleChange}
                            />
                            &nbsp;
                            <span className="shareOptionText">Post as Anonymous</span>
                        </div>
                    </div>
                    <button className="shareButton" type="submit">
                        Share
                    </button>
                </form>
            </div>
        </div>
    );
}