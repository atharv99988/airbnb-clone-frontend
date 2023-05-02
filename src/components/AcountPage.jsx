import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate } from "react-router-dom"

export default function AccountPage(){
    const { user,ready } = useContext(UserContext)

    if(!ready){
        return 'loading...'
    }

    if (ready && !user){
        return (<Navigate to={'/login'}></Navigate>)
    }
    return (
    <div>
        this is {user.name}
      
    </div>

    )
}