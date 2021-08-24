import React, { useEffect, useState } from 'react';
import { Iprops } from "../types";
import Emoji  from './Emoji';
import Comment from './Comment';
import {Link} from "react-router-dom";

function PersonalPost(props:Iprops) {
    const [open, setopen] = useState<boolean>(false);
    return (
        <>
        { 
   
     <div className="rounded-xl  relative shadow-md mt-4 px-6  py-6 w-2/3 mx-auto flex space-y-4 flex-col items-center bg-white">
         <div className="flex absolute left-6 ">
             <img className="w-20 border-2 p-1 border-gray-200 h-20 rounded-full" src={props.profilePic} alt="" />
             <div>
                 <Link to={`/profile/:${props.username}`} className="font-bold ml-3 text-lg ">{props.username}</Link>
                 <p className=" ml-4">{new Date(props.timestamp?.toDate()).toUTCString()}</p>
             </div>
             <h1 className="ml-96 text-red-600 font-bold text-xl">
                 
                 {props.privacyOfPost} 
                 </h1>
         </div>
         
         <div className="w-full ">

             <p className="mt-16 ml-2 "><span className="font-bold text-red-400 mr-3">Message:</span>{props.message}</p>

             <img className="w-full h-1/3 mt-2" src={props.image} alt="" />
         </div>
       
         <Emoji id={props.id} holePost={props.holePost} />
       
         <Comment open={open} id={props.id} />

     </div>
}</>
     
    )
}

export default PersonalPost;
