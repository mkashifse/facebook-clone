import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import db from '../firestore.config';
import { Link } from 'react-router-dom';
import Emoji from './Emoji';
import Comment from './Comment';
import { useSelector } from "react-redux";
import { UserState } from "../provider/userReducer";
import { Iprops } from '../types';
import userEvent from '@testing-library/user-event';
import { FaCameraRetro } from "react-icons/fa";




function Profile() {
    let user = useSelector<UserState, UserState["user"]>((state) => state.user);
    const { name }: any = useParams();
    const [open, setopen] = useState<boolean>(false);
    const [specific, setSpecific] = useState<string[]>([]);
    let ArrayUser: any = {}
    specific.map((userData: any) => (`:${userData.username}` === name ? ArrayUser = userData : ''))

    useEffect(() => {
        const fetchPosts = () => {
            db.collection('posts').onSnapshot((res) => {
                setSpecific(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as any)
            })
        }
        fetchPosts()
    }, [])

    return (
        <div>
        
            <div className="w-full mt-12 h-96 bg-white border-b-2 border-gray-300 to-white  flex justify-end items-center">
            <div style={{  backgroundImage: `url(${ArrayUser.image})`,backgroundBlendMode:'revert',backgroundPosition:'cover' }} className="w-11/12 mx-auto mt-2 rounded-md shadow-lg  flex justify-center items-center h-52  bg-red-300">
                <img className='h-40 w-40 mt-32 ml-44 z-10    border-4  border-white  rounded-full' src={ArrayUser.profilePic} alt="" />
                   <h2 className=" text-2xl font-bold right-32 top-40 z-30 relative">{ArrayUser.username}</h2>
              <FaCameraRetro className="text-3xl  text-gray-500  shadow-xl right-48 top-32 relative  z-30  bg-gray-100" />
            </div>
                   
            </div>
         
            {specific.map((userData: any) => (`:${userData.username}` === name ?
            
                <>
            
                    <div className="rounded-xl  relative left-1/3 mb-8 top-8 shadow-md mt-6 px-6  py-6 w-1/2   flex space-y-4 flex-col  items-center bg-white">

                        <div className="flex absolute left-6 ">
                            <img className="w-20 border-2 p-1 border-gray-200 h-20 rounded-full" src={userData.profilePic} alt="" />
                            <div>
                                <Link to={`/profile/:${userData.username}`} className="font-bold ml-3 text-md ">{userData.username}</Link>
                                <p className=" ml-4">{new Date(userData.timestamp?.toDate()).toUTCString()}</p>
                            </div>
                        </div>

                        <div className="w-full ">

                            <p className="mt-16 ml-2 "><span className="font-bold text-red-400 mr-3">Message:</span>{userData.message}</p>

                            <img className="w-full h-1/3 mt-2" src={userData.image} alt="" />
                        </div>
                        <Emoji id={userData.id} holePost={userData} />
                        <Comment open={open} id={userData.id} />
                      

                    </div>
                </>
                : ''))}

        </div>
    )
}

export default Profile;
