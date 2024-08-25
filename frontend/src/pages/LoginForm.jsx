import { api } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


export const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // const methodName = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post("api/token/", { 
                username: username, 
                password: password, 
            })


            localStorage.setItem(ACCESS_TOKEN, response.data.access)
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
            navigate("/")

            
        } catch (error) {
            alert("Credentials error")
            console.log(error)
        }
    }

  return (
    <>
        <form action="" onSubmit={handleSubmit} className="forms-login-register">
            <h1>Login</h1>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="input-forms"/>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-forms"/>

            <button className="login-btn">Login</button>
        </form>
    </>
  )
}