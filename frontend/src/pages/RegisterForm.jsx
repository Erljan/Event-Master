import { api } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


export const RegisterForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await api.post("api/user/register/", { 
                username: username, 
                password: password, 
                first_name:fname, 
                last_name:lname, 
                email: email
            })

            navigate("/login")
            
        } catch (error) {
            alert(error)
            console.log(error)
        }
    }

  return (
    <>
        <form action="" onSubmit={handleSubmit} className="forms-login-register">
            <h1>Register</h1>
            <input type="text" name="first_name" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="First Name" className="input-forms"/>
            <input type="text" name="last_name" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Last Name" className="input-forms"/>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input-forms"/>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="input-forms"/>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-forms"/>

            <button className="login-btn">Register</button>
        </form>
    </>
  )
}