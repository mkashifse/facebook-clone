import React,{useEffect,useState} from 'react';
import { FaSistrix,FaFacebook} from "react-icons/fa";
import firebase from 'firebase';
import { useSelector } from "react-redux";
import { UserState } from "../provider/userReducer";
import RequestComponent from "./RequestComponent";


import {BsHouseFill,BsLayoutTextSidebarReverse, BsFillPeopleFill,BsFillBriefcaseFill,BsPeopleCircle} from "react-icons/bs";

function Navbar() {
    let user = useSelector<UserState, UserState["user"]>((state) => state.user);
    const [notification,setNotification]=useState<number>(0);
    const [model,setModel]=useState<boolean>(false);
    useEffect(()=>{
        let notificationDb=  firebase.database().ref('notification');
             notificationDb.orderByChild('sendTo').equalTo(user.uid).on('value',(notify:any)=>{
                 if(notify.val()){
                 let realNotification:any= Object.values(notify.val()).filter((checkStatus:any)=>checkStatus.status==='pending')
                setNotification(realNotification.length);
                 }
             })
    },[user.uid]);
    const openRequestMOdel=()=>{
              setModel(!model);
    }
    return (
        <div className="bg-white flex z-40  h-14 shadow-lg fixed w-full  top-0">

             <div className="flex justify-center content-center items-center w-1/4 mt-1 ml-10">
                 <FaFacebook className="mr-2 text-blue-500 text-3xl"/>
                 <label className=" relative left-10"><FaSistrix className="text-gray-500 text-2xl"/></label>
                 <input type="text" placeholder="search facebook" className=" outline-none   bg-gray-200 py-2 px-12 rounded-full " />
             </div>
          
             <div className="flex w-1/2  justify-evenly items-center ">
            
                 <BsHouseFill className="text-3xl bg-blue border-b-4 border-blue-600"/>
                 <BsLayoutTextSidebarReverse className="text-3xl text-gray-400" />
                <span className="cursor-pointer" onClick={openRequestMOdel} > <p className="text-red-500 absolute bottom-8 text-xl">{notification}</p> <BsFillPeopleFill className="text-3xl text-gray-400 "/></span>

                 <BsFillBriefcaseFill className="text-3xl text-gray-400"/>
                 <BsFillPeopleFill className="text-3xl text-gray-400"/>
             </div>
             <RequestComponent model={model}  />
        </div>
    )
}

export default Navbar
