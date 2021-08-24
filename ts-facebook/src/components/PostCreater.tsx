import React,{useState,useEffect} from 'react';
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
    const [postType,setPostType]=useState<string>('');
    const [friendIds,setFriendIds]=useState<any[]>([]);
    console.log(postType)
       

    useEffect(()=>{
        db.collection('users').doc(user.uid).collection('friend-list').onSnapshot((res)=>{
             setFriendIds(res.docs.map((doc) => ( doc.data() ))) as any
        })
    },[]);
     
    const submitPublicPosts = (e: any) => {
        e.preventDefault();
        /// db stuff start here
       if(postType==='public'){
        db.collection("posts").add({
             message:input,
             timestamp:firebase.firestore.FieldValue.serverTimestamp(),
             username:user.displayName,
             image:imageUrl,
             profilePic:user.photoURL,
             privacyOfPost:postType
        })
    }else if(postType==='only-me'){
        db.collection("personalPost").add({
            message:input,
             timestamp:firebase.firestore.FieldValue.serverTimestamp(),
             username:user.displayName,
             profilePic:user.photoURL,
             userId:user.uid,
             privacyOfPost:postType,
             image:imageUrl,
        })
    }else if(postType==='friend-only'){
        db.collection("friendOnly").add({
            message:input,
             timestamp:firebase.firestore.FieldValue.serverTimestamp(),
             username:user.displayName,
             profilePic:user.photoURL,
             friendId: friendIds.map(friendId=>friendId.friends),
             privacyOfPost:postType,
             image:imageUrl,
             userId:user.uid,
        })
    }else{
        console.log('no privacy choose')
    }
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
                  
                </form>
            </div>
  
            <div  className="message-bottom rounded  flex-col flex w-full justify-center  bg-gray-200 p-2 ">
               <h2 className="text-red-700  text-center font-serif">Share Your post with</h2>
                <select name="select" onChange={(e)=>setPostType(e.target.value)} className="  h-8  text-red-500 hover:bg-gray-100  rounded-full px-8 outline-none  ">
                  <option >Choose privacy</option>
                    <option  className="" value="only-me">Only me</option>
                    <option value="friend-only">Friends only</option>
                    <option value="public">Public</option>

                </select>
                
            </div>
            <button className="bg-red-600 px-2 py-1 text-xl border-2 border-gray-700 rounded-lg text-white " type="submit" onClick={submitPublicPosts}>Post your post</button>
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
