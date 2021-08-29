import React, { useState, useEffect, } from 'react';
import { useHistory } from 'react-router';
import logo1 from "../images/face.svg"
import logo2 from "../images/facebook-removebg-preview - Copy.png"
import { auth, provider } from "../firestore.config";
import { useSelector, useDispatch } from "react-redux";
import { UserState } from "../provider/userReducer";
import db from "../firestore.config";
import firebase from "firebase";

function Login() {
    const user = useSelector<UserState, UserState["user"]>((state) => state.user);
    console.log(user, "users")
    const dispatch = useDispatch();
    const history = useHistory();

    // authentication with firebase
    function signIn() {
        auth.signInWithPopup(provider).then((result) => {
            console.log(result);
            dispatch({ type: "add_user", payload: result.user });
            // localStorage.setItem('user',JSON.stringify(result.user))
            // history.push('/dashboard')
        }).catch((error) => {
            alert(error.message);
        })
    }

    return (
        <div className="login flex-col h-screen w-full flex justify-center items-center">
            <img className="w-24 h-24" src={logo1} alt="" />
            <img className="" src={logo2} alt="" />
            <button className=" rounded bg-blue-600 text-lg text-white w-48 py-2" onClick={signIn} type="submit">Sign In</button>
        </div>
    )
}

export default Login;
