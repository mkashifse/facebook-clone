import React,{useRef} from 'react';
import "tailwindcss/tailwind.css"
import PostCreater from './components/PostCreater';
import Feed from './components/Feed';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import AddFriend from "./components/AddFriend"
import "./style/index.css";
import { useSelector } from "react-redux";
import { UserState } from "../src/provider/userReducer";
import { Route, BrowserRouter as Router } from "react-router-dom"
import { InputHTMLAttributes } from 'react';
function App() {

  let user = useSelector<UserState, UserState["user"]>((state) => state.user);
 
  return (
    
    <>
      <div className="App ">
       
        <Router>
          <Route path="/" exact>
            {
              !user ? <Login /> :
                <>
                  <Navbar />
                  <PostCreater />
                   <AddFriend/>
                  <Feed />
                </>
            }

          </Route>

          <Route path="/profile/:name" exact>
          <Navbar />
   
          <Profile />
          </Route>
        </Router>


      </div>
    </>
  );
}

export default App;
