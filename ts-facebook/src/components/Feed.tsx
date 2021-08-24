import React, { useState, useEffect } from 'react';
import Post from './Post';
import PersonalPost from "./PersonalPost";
import FriendsPost from './FriendsPost'
import db from "../firestore.config";
import { collectionSnapshot } from "../utils";
import { Iprops, IpropsFriends } from "../types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { UserState } from "../provider/userReducer";
import firebase from "firebase"

function Feed() {
    const user = useSelector<UserState, UserState["user"]>((state) => state.user);
    const [posts, setPosts] = useState<Iprops[]>([]);
    const [personalPosts, setPersonalPosts] = useState<Iprops[]>([]);
    const [friendsPosts, setFriendsPosts] = useState<IpropsFriends[]>([]);

    // friends only posts 
    let friendPosts = friendsPosts.filter((friendPost) => friendPost.userId === user.uid || friendPost.friendId.find(friendId => friendId === user.uid))
    // only me posts 
    let personal: Iprops[] = personalPosts && personalPosts.filter((k: any) => k.userId === user.uid);


    useEffect(() => {
        collectionSnapshot<Iprops[]>("posts", (list: Iprops[]) => {
            setPosts(list);
        })
        collectionSnapshot<Iprops[]>("personalPost", (list: Iprops[]) => {
            setPersonalPosts(list);
        })
        collectionSnapshot<IpropsFriends[]>("friendOnly", (list: IpropsFriends[]) => {
            setFriendsPosts(list);
        })
    }, []);

    return (

        <div className="feed bg-red mb-10">
            {/* public posts */}
            {posts.map((post: any) => (
                <Post
                    holePost={post}
                    profilePic={post.profilePic}
                    image={post.image}
                    message={post.message}
                    timestamp={post.timestamp}
                    username={post.username}
                    id={post.id}
                    userId={post.userId}
                    privacyOfPost={post.privacyOfPost}

                />
            ))}

            {/* private posts */}
            {personal.map((eachPost: Iprops) => (
                <PersonalPost
                    holePost={eachPost}
                    profilePic={eachPost.profilePic}
                    image={eachPost.image}
                    message={eachPost.message}
                    timestamp={eachPost.timestamp}
                    username={eachPost.username}
                    id={eachPost.id}
                    userId={eachPost.userId}
                    privacyOfPost={eachPost.privacyOfPost} />
            ))}
                    {/* friend Only posts */}
                    
            {friendPosts.map((eachPost: Iprops) => (
                <PersonalPost
                    holePost={eachPost}
                    profilePic={eachPost.profilePic}
                    image={eachPost.image}
                    message={eachPost.message}
                    timestamp={eachPost.timestamp}
                    username={eachPost.username}
                    id={eachPost.id}
                    userId={eachPost.userId}
                    privacyOfPost={eachPost.privacyOfPost} />
            ))}

        </div>

    )
}

export default Feed;
