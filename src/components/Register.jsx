import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';



export default function RegisterPage(params){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    function registerUser(ev) {
        ev.preventDefault()
        axios.post('/register',{name,email,password}).then(() => {
            alert('registration sucessfull now you can login')
        }).catch(err => {
            alert('Registration failed please try againn later')
        })
    }

    return (
        <div className="mt-4 mb-4 grow flex items-center justify-around ">
            <div className="mb-64">
                <h1 className="text-4xl text-center">Register</h1>
                <form className="max-w-md mx-auto border-gray-300" onSubmit={registerUser}>
                    <input type="text" name="name" id="name" placeholder="your name" value={name} onChange={ev => setName(ev.target.value)}/>
                    <input type="email" name="email" id="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" name="password" id="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary rounded-md">Register</button>
                    <div className="text-center py-2 text-gray-500">
                    Alread a member ?<Link to={'/login'} className="underline text-black">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}