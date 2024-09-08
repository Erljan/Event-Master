import { api } from "../api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Login.css"
import "../styles/index.css"


export const LoginForm = ({setUsername}) => {
    const [localUsername, setLocalUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // const methodName = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await api.post("api/token/", { 
                username: localUsername, 
                password: password, 
            })


            localStorage.setItem(ACCESS_TOKEN, response.data.access)
            localStorage.setItem(REFRESH_TOKEN, response.data.refresh)

            setUsername(localUsername)
            navigate("/")

            
        } catch (error) {
            alert("Credentials error")
            console.log(error)
        }
    }

  return (
    <div className="login">
        {/* <h1 className="welcome">Welcome Back!</h1> */}
        <form action="" onSubmit={handleSubmit} className="forms-login-register">
            <h1>Login</h1>
            <input type="text" name="username" value={localUsername} onChange={(e) => setLocalUsername(e.target.value)} placeholder="Username" className="input-forms"/>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-forms"/>
            <button className="login-btn">Login</button>
            <p>Don't have an account? <span><Link to="/signup" className="to-reg">Register</Link></span></p>
        </form>
    </div>
  )
}