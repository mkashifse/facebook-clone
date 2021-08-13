import React, { useEffect } from 'react';
import { FaThumbsUp, FaRegHeart, FaComment, FaShare, FaRegLaughBeam, FaRegSadCry, FaRegSmileWink, FaRegSadTear, FaRegTired } from "react-icons/fa";
import { useState } from 'react';
import db from '../firestore.config';
import { auth } from "../firestore.config"
import firebase from "firebase"
import { useSelector } from "react-redux";
import { UserState } from "../provider/userReducer";
import { collectionSnapshot } from "../utils";
import { Iprops } from "../types"
interface Iprops2 {
    id: string;
    holePost: any | string[],
}
interface Iprop3 {
    feelings: any
}
interface Ic {
    feeling: string;
    username: string;
    feelings: any;
    id: string;
    uid: string;
    data: string
}

function Emoji(props: Iprops2) {
    let user = useSelector<UserState, UserState["user"]>((state) => state.user);

    const [main, setMain] = useState({ T: FaThumbsUp, feeling: "like", color: 'text-blue-500' });
    const [feedback, setFeedback] = useState<boolean>(false);
    const [open, setopen] = useState<boolean>(false);
    const [getFeeling, setGetFeeling] = useState<Ic[]>([]);
    const [openEmoji, setOpenEmoji] = useState<boolean>(false)

    const [icons, setIcons] = useState({
        angry: FaRegSadCry,
        smile: FaRegSmileWink,
        sad: FaRegSadTear,
        heart: FaRegHeart,
        thumb: FaThumbsUp,
        wow: FaRegLaughBeam
    });

    const [posts, setPosts] = useState<Iprop3[]>([]);
    useEffect(() => {
        collectionSnapshot<Iprop3[]>("posts", (list: Iprop3[]) => {
            setPosts(list);
        })
    }, []);


       useEffect(()=>{
            db.collection('users').doc(user.uid).set({
                       username:user.displayName,
                       userImage:user.photoURL
             })

       },[]);




    interface emojiType {
        feelings: object;
        feeling: any;
    }
    const [emojiData, setEmojiData] = useState<emojiType[]>([])

    const [userFeel, setUserFeel] = useState<string[]>([]);

    /// get from posts doc id 
    useEffect(() => {
        db.collection('posts').doc(props.id).onSnapshot((res) => {
            let data = res.data() as any;
            if (data.feelings) {
                let parseArray = Object.values(data.feelings) as any;
                setUserFeel(parseArray)

            }
        })

    }, [])

    //// get from all posts 

    // useEffect(() => {
    //     db.collection('posts').onSnapshot((res) => {
    //         const emojiData = res.docs.map((doc) => (doc.data())) as any;
    //         const emojiArray = emojiData.map((h: any) => Object.values(h.feelings))
    //         const emojiObject = emojiData.map((h: any) => Object.keys(h.feelings))
    //         setEmojiData(emojiArray);
    //                    setUserId(emojiObject)


    //     })

    // }, [])
    // emojiData.map((obj: any) => console.log(obj.map((val: any) => val), "how")
    ////// update emoji
    // console.log(emojiData,"oooo")
    const updateFeeling = (feeling: string) => {
        db.collection('posts').doc(props.id).update({
            feelings: {
                ...props.holePost.feelings,
                [user.uid]: { feeling: feeling, username: user.displayName }
            }
        }
        )
    }

    const openComment = () => {
        setopen(!open);
    }
    const showAction = () => {
        setFeedback(!feedback);
    }
    const showFeedback = () => {
        setOpenEmoji(!openEmoji)
    }
    return (
        <>
            <div style={{ position: "relative", left: "-100px", top: "20px" }} className={` duration-75 transition-all ${feedback ? 'block' : "hidden"} z-20  flex  rounded-l-lg rounded-r-lg justify-evenly text-sm relative mr-12 left-0  top-0 space-x-1 px-4 bg-white shadow-lg  py-2`}>

                <div onClick={() => {
                    updateFeeling("Like")
                    setMain({ T: FaThumbsUp, feeling: 'Like', color: "text-blue-500" })
                    setFeedback(false)
                }}>
                    {<icons.thumb className="text-xl p-2 w-10 h-10 text-white rounded-full bg-blue-700 shadow-lg" />}
                </div>
                <div onClick={() => {
                    updateFeeling("Love")
                    setMain({ T: FaRegHeart, feeling: 'Love', color: "text-red-500" })
                    setFeedback(false)
                }}>
                    {<icons.heart className="text-2xl p-1 w-10 h-10 text-white rounded-full bg-red-500 shadow-lg" />}
                </div>
                <div onClick={() => {
                    updateFeeling("Sad")
                    setMain({ T: FaRegSadCry, feeling: "Sad", color: "text-yellow-500" })
                    setFeedback(false)
                }}>
                    {<icons.sad className="text-2xl p-1 w-10 h-10 text-white rounded-full bg-yellow-500 shadow-lg" />}
                </div>
                <div onClick={() => {
                    updateFeeling("Smile")
                    setMain({ T: FaRegSmileWink, feeling: "smile", color: "text-green-500" })
                    setFeedback(false)
                }}>
                    <icons.smile className='   text-2xl p-1 w-10 h-10 text-white rounded-full bg-green-500 shadow-lg' />
                </div>
                <div onClick={() => {
                    updateFeeling("Angry")
                    setMain({ T: FaRegSadCry, feeling: "Angry", color: "text-yellow-500" })
                    setFeedback(false)
                }}>
                    <icons.angry className='text-2xl p-1 w-10 h-10 text-white rounded-full bg-yellow-500 shadow-lg' />
                </div>
                <div onClick={() => {
                    updateFeeling("Wow")
                    setMain({ T: FaRegLaughBeam, feeling: "wow", color: "text-yellow-500" })
                    setFeedback(false)
                }}>
                    <icons.wow name="thump" className='text-2xl p-1 w-10 h-10 text-white rounded-full bg-yellow-400 shadow-lg' />
                </div>


            </div>

            <div className='z-10 flex text-center rounded-l-lg rounded-r-lg justify-evenly items-center text-sm w-full bg-gray-100 py-2 '>

                <div className=" flex items-center justify-center flex-col">

                    <main.T onMouseOver={showAction} className={`${main.color} text-gray-400 text-3xl`} />
                    <p onClick={showFeedback} className={`mt-1 texT-md font-mono`}>{main.feeling}</p>
                    <p onClick={showFeedback} className={` mt-1 text-xl font-mono`}>{user.displayName}</p>

                </div>
                <div onClick={openComment} className="flex items-center justify-center flex-col">
                    <FaComment className='text-3xl text-gray-400' />
                    <p className="mt-1">Comment</p>
                </div>
                <div className="flex items-center justify-center flex-col">
                    <FaShare className="text-3xl text-gray-400" />
                    <p className="mt-1">Share</p>

                </div>

            </div>
            {
                <div className={` w-full ml-32  flex-col ${openEmoji ? "flex" : "hidden"}  `}>
                    <div className=" flex justify-evenly items-start  space-y-2 flex-col">
                        {

                            userFeel.map((h: any) => (
                                <div className="flex w-64 shadow-md rounded-full justify-evenly">
                                    <p className={`text-center text-red-500 font-semibold text-md`}>{h.username}</p>
                                    <p className={`text-center  font-semibold text-md`}>{h.feeling}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }

        </>
    )
}

export default Emoji
