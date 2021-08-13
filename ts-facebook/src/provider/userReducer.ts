import { Iprops } from "../types"

export interface UserState{
    user:string|any,
    post:Iprops[]
}
let initialState={
    user:"",
    post:[]
}

type Action={type:"add_user",payload:string}|{type:"post",payload:Iprops[]}
export let userReducer=(state:UserState=initialState,action:Action)=>{
    switch(action.type){
        case "add_user":{
            return  {
                ...state,
                user:action.payload
            }
        }
        case "post":{
            return {
                ...state,
                post:action.payload
            }
        }
        default:
            return state;
    }
}