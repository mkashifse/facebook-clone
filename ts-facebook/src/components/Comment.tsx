import React, { useState, useEffect } from 'react';
import db from '../firestore.config';
import { useSelector } from "react-redux";
import { UserState } from "../provider/userReducer";
import { GrRaspberry, GrReddit } from "react-icons/gr";
// import { collectionSnapshot } from "../utils"
import firebase from 'firebase';

interface IComment {
    open: boolean;
    id: string
}
interface Ic {
    comment: string[],
    username:string,
    currentTime:string
}

function Comment(props: IComment) {
    let user = useSelector<UserState, UserState["user"]>((state) => state.user);
    const [userComment, setUserComment] = useState<string>('');

    const typeComment = (e: any) => {
        setUserComment(e.target.value);
    }
    const commentAdd = (e: any) => {
        e.preventDefault();
        db.collection('posts').doc(props.id).collection("comments").add({
            comment: userComment,
            username: user.displayName,
            currentTime: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setUserComment("");
    }


    const [getComment, setGetComment] = useState<Ic[]>([]);
    useEffect(() => {
        db.collection('posts').doc(props.id).collection('comments').orderBy('currentTime',"desc").onSnapshot((res)=>{
            const list = res.docs.map((doc) => (doc.data())) as any;
            setGetComment(list);

        })
    }, [props.id]);     /// props.id as a dependency
 
    return (
        <div className={`w-full  `}>
            <form onSubmit={commentAdd} className="w-full flex justify-start flex-col items-center py-4 bg-gray-100">
                <div className="flex px-12 w-full">
                    <img src={user.photoURL} className="w-16 border-2 p-1 border-gray-200 h-16 rounded-full" alt="user-img" />
                    <input value={userComment} onChange={typeComment} type="text" className="rounded-full w-11/12  mx-auto px-6 outline-none h-12 mt-2 ml-3 bg-gray-200 text-black" placeholder="write a comment..." />
                    <div className="relative right-24 flex top-6 ">
                        <GrRaspberry className="mr-4 text-gray-500" />
                        <GrReddit className="text-gray-500" />
                    </div>
                </div>

                {getComment.map(user => (
                    <div className="  flex bg-gray-200 py-2 mb-0.5 mx-10 w-2/3 px-8 text-start rounded-full">
                       <h1 className="font-semibold">{user.username}</h1>:
                       <p>{ user.comment}</p>
                     </div>
                ))}
            </form>


        </div>
    )
}

export default Comment;
