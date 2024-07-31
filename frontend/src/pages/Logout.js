import { redirect } from "react-router"
export function action(){
    localStorage.clear("token")
    return redirect("/")
}