import React,{useState,useEffect} from 'react';
import Post from './Post';
import db from "../firestore.config";
import {collectionSnapshot} from "../utils";
import {Iprops} from "../types";
import {useDispatch} from "react-redux";

function Feed() {
    const dispatch=useDispatch();
   
    const [posts,setPosts]=useState<Iprops[]>([]);
      console.log(posts,"all")
    useEffect(()=>{
        collectionSnapshot<Iprops[]>("posts", (list: Iprops[]) => {
            setPosts(list);
        })
    },[])
    
    return (
        
        <div className="feed bg-red mb-10">
           {posts.map((post)=>{
             dispatch({type:"post",payload:post})
             
              return <Post 
              holePost={post}
               profilePic={post.profilePic}
               image={post.image}
               message={post.message}
               timestamp={post.timestamp}
               username={post.username}
               id={post.id}
               userId={post.userId}
               
                />
})}
        </div>
        
    )
}

export default Feed;
