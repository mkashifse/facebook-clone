import React, { useEffect, useState } from 'react'
import "../style/model.css";
import firebase from 'firebase';
import db from '../firestore.config';
import { useSelector } from "react-redux";
import { UserState } from "../provider/userReducer";

type propOfModel = {
    model: boolean,
}
function RequestComponent(props: propOfModel) {
    const user = useSelector<UserState, UserState["user"]>((state) => state.user);
    const [userRequests, setUserRequests] = useState<any[]>([]);
    const [userKeys, setUserKeys] = useState<any[]>([]);



    useEffect(() => {
        let notiRef = firebase.database().ref('notification');

        notiRef.orderByChild('sendTo').equalTo(user.uid).on('value', (userRequests: any) => {

            if (userRequests.val()) {
                const listOfData = Object.entries(userRequests.val())
                setUserRequests(listOfData);

            }
        })

    }, [user.uid]);

    const acceptRequest = (reqKey: any) => {
        firebase.database().ref('notification').child(reqKey).once('value', (noti: any) => {
            let reqObj = noti.val();
            reqObj.status = "accept";

            firebase.database().ref('notification').child(reqKey).update(reqObj, (err) => {
                if (err) alert(err);
                else {
                    const friendList = { sender: reqObj.sendFrom, receiver: reqObj.sendTo }
                    firebase.database().ref('friend-list').push(friendList, (err) => {
                        if (err) alert(err);
                    })
                }
            })
        })

    }

    const rejectRequest = (reqKey: any) => {

        firebase.database().ref('notification').child(reqKey).once('value', (noti: any) => {
            let reqObj = noti.val();
            reqObj.status = "reject";

            firebase.database().ref('notification').child(reqKey).update(reqObj, (err) => {
                if (err) alert(err);
                else { }
            })
        })


    }
    return (
        <div className={`${props.model ? 'model' : 'closeModel'}`}>
            <div className={`${props.model ? 'visible' : 'noVisible'}`}>
                <p className="text-center text-xl font-serif">Your friend request list</p>
                <hr className="bg-red-600 w-full h-1" />
                {userRequests.map((userRequestData: any) => (
                    userRequestData[1].status === 'pending' ?
                        <div className={`p-2 bg-white shadow-2xl mt-4 flex flex-col items-center justify-evenly`}>
                            <h3><span className="font-bold font-serif">{userRequestData[1].name}:</span>send friend request to you</h3>
                            <div className="p-1 px-2 space-x-1 w-full bg-white shadow-2xl mt-1 flex items-center justify-evenly">
                                <img className="w-12 border-2 border-gray-400 p-1 rounded-full" src={userRequestData[1].photo} alt={userRequestData[1].photo} />
                                <button onClick={() => acceptRequest(userRequestData[0])} className="bg-blue-700 text-white w-32 rounded-md px-2 py-1">Accept Request</button>
                                <button onClick={() => rejectRequest(userRequestData[0])} className="bg-red-700 text-white w-32 rounded-md px-2 py-1">Delete</button>
                            </div>
                        </div>
                        : ''

                ))}

            </div>
        </div>
    )
}

export default RequestComponent;
