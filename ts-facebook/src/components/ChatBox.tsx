import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineSend } from "react-icons/ai";
import db from "../firestore.config";
import firebase from 'firebase';
import { useSelector } from "react-redux";
import { UserState } from "../provider/userReducer";
interface friends{
      data:any, 
      show:boolean,
      setShow:any
}

function ChatBox(props:friends) {
    console.log(props.data,'really or not');
    
    let user = useSelector<UserState, UserState["user"]>((state) => state.user);
    const [typing, setTyping] = useState<string>('');
    const [message, setMessage] = useState<string[]>([]);
    const [wak, setWak] = useState<string[]>([]);
    const [friends,setFriends]=useState<any[]>([])
 
    
    const chat = message.filter((k:any)=>k.fId===user.uid || k.user===user.uid);
    console.log(chat,'lmo')
    
    const messagesEndRef = useRef<any>()

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [message]);

    useEffect(() => {
        db.collection('chat').orderBy('timestamp', 'asc').onSnapshot((res) => {
            setMessage(res.docs.map((msg: any) => msg.data()))
        })
    }, [])

    const sendMessage = (e: any) => {
        e.preventDefault();
        db.collection('chat').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            typing,
            user: user.uid,
            fId:props.data.id,
            name:user.displayName,
            image:user.photoURL
        })
        console.log(typing, 'me');
        setTyping('')
    }
    useEffect(()=>{
        let wak=  chat.filter((msg:any)=> props.data.friends===msg.fId ||props.data.friends===msg.user );
        setWak(wak)
       
    },[props.data.id,props.data.friends,message])

    console.log(wak,'ameer');
    


    useEffect(()=>{
        db.collection('users').doc(user.uid).collection('friend-list').onSnapshot((res)=>{
             setFriends(res.docs.map((doc) => ( { ...doc.data(), id: doc.id} ))) as any
        })
    },[]);
    return (
        <div className={`${props.show?'chat z-30 fixed top-32 left-56 bg-white chat rounded-tr-2xl  w-96 h-96':' opacity-0 chat z-30 fixed top-32 left-56 bg-white chat rounded-tr-2xl  w-96 h-96 '} `}>
            <div className="absolute top-0 w-full h-12 bg-gray-300">
                <img src={props.data.frImage} className=" absolute left-2 top-1 w-10 border-2 p-1 border-gray-200 h-10 rounded-full" alt="" />
                <p className="ml-14 mt-2">{props.data.frName}</p>
                <AiOutlineClose onClick={()=>props.setShow(false)} className="right-2 cursor-pointer top-2 text-red-500 font-bold text-2xl absolute" />
            </div>

            <div className="w-full  overflow-y-scroll   mt-12 pb-2 h-72 flex-col bg-white flex  items-center">

                {wak.length > 0 ? wak.map((msg: any) => (
                    user.uid === msg.user ?
                           <>
                        <p className=" z-30 relative  top-10 left-24 text-red-700 border-b-2 border-red-400 font-semibold">{msg.name}</p>
                        <img src={msg.image} className="w-8  ml-2 relative top-10  p-1 h-8 z-40 rounded-full"  alt="" />
                        <h1 style={{ wordWrap: 'break-word' }} className="bg-white p-1 z-20 px-10   w-1/2 chat font-light text-blue-600 rounded-xl mt-2  ml-40 ">{msg.typing}</h1>
                      </>
                        :<>
                        <p className="z-30 relative  top-10 right-24  border-b-2 border-green-400 text-gray-700 font-bold">{msg.name}</p>
                        <img src={msg.image} className="w-8  p-1  mr-2 relative top-9 z-40 h-8 rounded-full"  alt="" />
                        <h1 style={{ wordWrap: 'break-word' }} className="bg-gray-100 z-20  text-gray-800 w-1/2 chat font-light text-white-600 rounded-xl mt-2 mr-40  px-6">{msg.typing}</h1>
                        </>
                ))
                    : <div className="w-full h-full flex items-center flex-col capitalize justify-center">
                        <h1 className="text-red-600 text-xl"> you have no message yet!.</h1>
                        <img src="https://image.flaticon.com/icons/png/512/1243/1243415.png" className="w-12 h-12" alt="" />
                    </div>
                }

                <div ref={messagesEndRef} />

            </div>


            <div className="absolute bottom-0 w-full h-12 chat  bg-gradient-to-l from-purple-700  to-pink-800">
                <form onSubmit={sendMessage} className="flex" >
                    <input value={typing} onChange={(e: any) => setTyping(e.target.value)} className="w-80 ml-4 mt-1 px-6 chat rounded-2xl outline-none h-10" type="text" />
                    <button className="ml-1 mt-1 text-white text-3xl"><AiOutlineSend /></button>
                </form>

            </div>

        </div>
    )
}

export default ChatBox;
