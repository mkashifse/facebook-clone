import React ,{useState}from 'react';
// import ChatBox from './ChatBox'
interface friends{
    name: string, 
    image: string,
    id:string
}
function Friends(props:friends) {
    const [fr,setFr]=useState<any>();
    console.log(fr,'ha')

    return (
         <div onClick={()=>setFr(props.id) }  >
        <div className="cursor-pointer flex w-11/12 bg-white opacity-70 hover:bg-blue-300 hover:text-white rounded-3xl mt-4 mx-2  px-3 py-1">
            <img className="w-12 border-2 p-1 border-gray-200 h-12 rounded-full" src={props.image} alt="" />
            <p className="text-black ml-2 mt-1 hover:text-white  z-10">{props.name}
            </p>
            <span className="text-red-500 opacity-50  ml-2 mt-2  text-sm">chat ...</span>
            
        </div>
        {/* <ChatBox id={fr} name={props.name} image={props.image}/> */}
        </div>
        

    )
}

export default Friends;
