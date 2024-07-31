import { redirect } from "react-router";

export function getAuthToken(){
    const token=localStorage.getItem("token");
    if(!token){
        return null;
    }
    const tokenDuration=getDuration();
    if(tokenDuration<0){
        return "EXPIRED"
    }
    return token;
}
export function getDuration(){
    const storedExpiration=localStorage.getItem("expiration");
    const expiration=new Date(storedExpiration);
    const now=new Date();
    const duration=expiration.getTime()-now.getTime();
    return duration;
}
export function tokenLoader(){

    return getAuthToken();
}
export function chechAuthLoader(){
    const token=getAuthToken();
    if(!token){
        return redirect('/auth')
    }
}