import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [user ,setUser] = useState()
    const[ready,setReady] = useState(false)

    useEffect(() =>{
        if(!user){
            axios.get('/user').then(user => {
                setUser(user.data);
                setReady(true)
            }).catch(err => {
                alert('some error')
            })
        }
    })

    return (
        <UserContext.Provider value = {{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
    )
}