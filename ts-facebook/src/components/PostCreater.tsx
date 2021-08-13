import userEvent from '@testing-library/user-event';
import React,{useState} from 'react';
import { FaVideo, FaImage } from "react-icons/fa";
import {useSelector} from "react-redux";
import {UserState} from "../provider/userReducer";
import db from '../firestore.config';
import {Iprops} from "../types";
import firebase from 'firebase';


function PostCreater() {
    let user=useSelector<UserState,UserState["user"]>((state)=>state.user);

    
    const [input,setInput]=useState<string>("");
    const [imageUrl,setImageUrl]=useState<string >("");


    const handleClick = (e: any) => {
        e.preventDefault();
        /// db stuff start here
        db.collection("posts").add({
            message:input,
             timestamp:firebase.firestore.FieldValue.serverTimestamp(),
             username:user.displayName,
             image:imageUrl,
             profilePic:user.photoURL,
             userId:user.uid
        })
        console.log(input);
        setInput("");
        setImageUrl("");
        
    }
    return (
        <div className="message-sender rounded-xl shadow-md mt-24 p-6 w-2/3 m-auto flex space-y-4 flex-col items-center bg-white">
            <div className=" flex w-full ">
                <form className="flex  justify-center items-center w-full space-x-4 ">
                   <img src={user.photoURL} className="w-16 border-2 p-1 border-gray-200 h-16 rounded-full" alt="user-img" />
                    <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}
                     className="  flex-1 bg-gray-50  border-2 border-gray-300 rounded-xl outline-none px-8 py-1"
                        placeholder={'whats on your mind'} />
                    <input type="text" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}
                     className="flex-1  border-2 bg-gray-50 border-gray-300 rounded-xl outline-none px-8 py-1"
                        placeholder={'image url optional'} />
                    <button className="hidden" type="submit" onClick={handleClick}>hidden button</button>
                </form>
            </div>
            <div className="message-bottom  flex w-1/3 justify-between items-center ">
                <div className="flex bg-gray-100 w-32 cursor-wait rounded-xl  pointer hover:bg-gray-100 p-2  justify-between items-center  video-option">
                    <FaVideo style={{ color: 'red' }} />
                    <h3>Live Video</h3>
                </div>
                <label htmlFor="upload" className="flex bg-gray-100 w-36 cursor-pointer rounded-xl hover:bg-gray-100 p-2 justify-between items-center">
                    <FaImage style={{ color: "green" }} />
                    <h3>photo/image</h3>
                </label>
                <input type="file" className="w-full hidden" id="upload" />
            </div>

        </div>

    )
}

export default PostCreater;
