export interface Iprops {
    profilePic:string;
    image:string;
    username:string;
    timestamp:any|object
    message:string;
    id:string,
    holePost:any,
    userId:any,
    privacyOfPost:any;
  }
export interface IpropsFriends {
    profilePic:string;
    image:string;
    username:string;
    timestamp:any|object
    message:string;
    id:string,
    holePost:any,
    userId:any,
    privacyOfPost:any;
    friendId:string[]
  }