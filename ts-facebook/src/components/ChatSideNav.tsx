import React, { useEffect, useState } from "react";
import Friends from "./Friends";
import Message from "./Message";
import { BiMenu } from "react-icons/bi"
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai"

// import ChatBox from "./ChatBox";
import db from '../firestore.config';
import { collectionSnapshot } from "../utils";
import { useSelector } from "react-redux";
import { UserState } from "../provider/userReducer";
import ChatBox from "./ChatBox";

const ChatSideNav = () => {
    let user = useSelector<UserState, UserState["user"]>((state) => state.user);
    const [users, setUsers] = useState([]);
    const [friends, setFriendIds] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [show, setShow] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(true);


    console.log(close, 'move on');

    
    useEffect(() => {
        const fetchUsers = () => {
            db.collection('users').onSnapshot((res) => {
                setUsers(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any)
            })
        }
        fetchUsers();

    }, []);

    useEffect(() => {
        db.collection('users').doc(user.uid).collection('friend-list').onSnapshot((res) => {
            setFriendIds(res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) as any
        })
    }, []);
    const set = () => {
        setClose(!close)
    }
    return (
        <>
            <div className={`${close ? ' chat z-40 fixed top-40  bottom-20 w-1/6 h-3/5 trans ' : ' transition-all	duration-300   hide-side z-40 fixed top-40   bottom-20 w-1/6 h-3/5'} ${friends.length > 0 ? ' bg-chat   chat z-40 fixed top-40  bottom-20 w-1/6 h-3/5' : ' bg-white chat z-40 fixed top-40  bottom-20 w-1/6 h-11/12'} }`}>

                <div className="absolute flex px-2 bottom-full justify-center items-center text-center w-full h-12  rounded-t-2xl text-white bg-gradient-to-l from-purple-700  to-pink-800">
                    <h2 className="text-center  text-xl">chat  with friends</h2>
                    <img className="w-10 ml-2" src="https://image.flaticon.com/icons/png/512/1243/1243415.png" alt="" />
                </div>
                {close ?
                    <h1 onClick={set} className=" ml-56 absolute text-3xl top-0"><AiOutlineDoubleLeft /></h1>
                    :
                    <h1 onClick={set} className="  ml-56 absolute text-3xl top-0">< AiOutlineDoubleRight /></h1>
                }
                {
                    friends.length > 0 ?
                        friends.map((friend: any) => (
                            <>
                                <div onClick={() => {
                                    setData(friend)
                                    setShow(true)
                                }} className="cursor-pointer flex w-11/12 bg-white opacity-90 hover:bg-blue-300 hover:text-white rounded-3xl mt-4 mx-2  px-3 py-1">
                                    <img className="w-12 border-2 p-1 border-gray-200 h-12 rounded-full" src={friend.frImage} alt="" />
                                    <p className="text-black ml-2 mt-1 hover:text-white  z-10">{friend.frName}
                                    </p>
                                    <span className="text-red-500 opacity-50  ml-2 mt-2  text-sm">chat ...</span>

                                </div>
                                {/* <Friends  id={friend.friends}  image={friend.frImage} name={friend.frName} /> */}
                                <ChatBox setShow={setShow} show={show} data={data} />
                            </>
                        ))
                        :
                        <Message />
                }
            </div>
        </>
    )

}
export default ChatSideNav;