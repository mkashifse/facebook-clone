import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import db from '../firestore.config';
import { useSelector } from "react-redux";
import { UserState } from "../provider/userReducer";

function AddFriend() {
    let user = useSelector<UserState, UserState["user"]>((state) => state.user);
    const [notificationList, setNotificationList] = useState<any[]>([]);
    const [allUser, setAllUser] = useState<string[]>([]);


    ///// add friend request in database
    const sendRequest = (userIdOFsender: any, index: number) => {
        let notification = {
            sendTo: userIdOFsender,
            sendFrom: user.uid,
            name: user.displayName,
            photo: user.photoURL,
            dateTime: new Date().toLocaleString(),
            status:'pending'
        }

        firebase.database().ref('notification').push(notification, (error) => {
            if (error) {
                alert(error)
            }

        })
    }
    /////// check id of receiver of request
    const checkRequest = (suggestionBoxUser: any) => {
     
        const found = notificationList.find(
            item => item.sendTo === suggestionBoxUser.id
        );

        if (found) {
            return true;
        } else {
            return false;
        }
    };

    /// useEffect for fetcging post from database

    useEffect(() => {
        const fetchPosts = () => {
            db.collection('users').onSnapshot((res) => {
                setAllUser(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any)
            })
        }
        fetchPosts()
    }, []);

    useEffect(() => {
        let notiRef = firebase.database().ref('notification');

        notiRef.orderByChild('sendFrom').equalTo(user.uid).on('value', (requests: any) => {
            if (requests.val()) {
                const list = Object.values(requests.val())
                setNotificationList(list)
            }
        })

    }, [allUser, user.uid])

    return (
        <div className=" w-3/4 mx-auto py-4 bg-gray-50 shadow-md  mt-4 overflow-auto rounded-md ">
            <h2 className="text-center mb-2  border-b border-gray-200 text-xl w-full">Make Friends Online</h2>
            <div className=" w-full  flex justify-center items-center h-full  space-x-24 ">
                {allUser.map((userData: any, index: number) => (`${userData.username}` !== user.displayName ?

                    <div className="  rounded-md shadow bg-white w-48 h-52 flex flex-col justify-center items-center  text-center content-center">
                        <img className="w-24 rounded border border-gray-200 h-24" src={userData.userImage} alt="" />
                        <p className="w-full text-center mt-2 text-xl ">{userData.username}</p>
                        { checkRequest(userData) ?
                            <button className="  mt-4 w-11/12 p-1  text-center bg-red-500 text-white rounded">request send</button>
                            :
                            <button onClick={() => sendRequest(userData.id, index)}
                                className="  mt-4 w-11/12 p-1  text-center bg-blue-500 text-white rounded">Add Friend</button>
                        }
                    </div>

                    : ''))}
            </div>
        </div>
    )
}

export default AddFriend;
