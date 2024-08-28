import { api } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css"

// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


export const RegisterForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()

    const locations = [
        'Alabama',  
        'Alaska',
        'Arizona ',
        'Arkansas ',
        'California ',
        'Colorado ',
        'Connecticut ',
        'Delaware ',
        'Florida ',
        'Georgia ',
        'Hawaii ',
        'Idaho ',
        'Illinois ',
        'Indiana ',
        'Iowa ',
        'Kansas',
        'Kentucky ',
        'Louisiana ',
        'Maine ',
        'Maryland ',
        'Massachusetts ',
        'Michigan ',
        'Minnesota ',
        'Mississippi ',
        'Missouri ',
        'Montana ',
        'Nebraska ',
        'Nevada ',
        'New Hampshire ',
        'New Jersey ',
        'New Mexico ',
        'New York ',
        'North Carolina ',
        'North Dakota ',
        'Ohio ',
        'Oklahoma ',
        'Oregon ',
        'Pennsylvania ',
        'Rhode Island ',
        'South Carolina ',
        'South Dakota ',
        'Tennessee ',
        'Texas ',
        'Utah ',
        'Vermont ',
        'Virginia ',
        'Washington ',
        'West Virginia ',
        'Wisconsin ',
        'Wyoming',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await api.post("api/user/register/", { 
                username: username, 
                password: password, 
                first_name:fname, 
                last_name:lname, 
                email: email,
                location: location
            })

            navigate("/login")
            
        } catch (error) {
            alert(error)
            console.log(error)
        }
    };      


    const checkPassword = () => {
        const password = document.getElementById('password').value;
        const length = document.getElementById('length');
        const lowercase = document.getElementById('lowercase');
        const uppercase = document.getElementById('uppercase');
        const number = document.getElementById('number');
        const special = document.getElementById('special');
        
        // Check length
        if (password.length >= 8) { 
            length.classList.add('valid');
            length.classList.remove('invalid');
        } else {
            length.classList.add('invalid');
            length.classList.remove('valid');
        }

        // Check lowercase
        if (/[a-z]/.test(password)) {
            lowercase.classList.add('valid');
            lowercase.classList.remove('invalid');
        } else {
            lowercase.classList.add('invalid');
            lowercase.classList.remove('valid');
        }

        // Check uppercase
        if (/[A-Z]/.test(password)) {
            uppercase.classList.add('valid');
            uppercase.classList.remove('invalid');
        } else {
            uppercase.classList.add('invalid');
            uppercase.classList.remove('valid');
        }

        // Check number
        if (/\d/.test(password)) {
            number.classList.add('valid');
            number.classList.remove('invalid');
        } else {
            number.classList.add('invalid');
            number.classList.remove('valid');
        }

        // Check special character
        if (/[\W_]/.test(password)) {
            special.classList.add('valid');
            special.classList.remove('invalid');
        } else {
            special.classList.add('invalid');
            special.classList.remove('valid');
        }
    };

    const togglePassword = () => {
        const passwordField = document.getElementById('password');
        const toggleButton = document.getElementById('togglePW');
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleButton.textContent = 'Hide Password';
            } else {
                passwordField.type = 'password';
                toggleButton.textContent = 'Show Password';
            }
        }
    

  return (
    <>
      <div className="textbox">
            <form action="" onSubmit={handleSubmit} className="forms-login-register">
            <div className="titletext">Create Your Account</div>
            <h2>First Name</h2>
            <input type="text" name="first_name" value={fname} onChange={(e) => setFname(e.target.value)} className="input-forms"/>
            <h2>Last Name</h2>
            <input type="text" name="last_name" value={lname} onChange={(e) => setLname(e.target.value)} className="input-forms"/>
            <h2>Location</h2>

            <h2>Email</h2>
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-forms"/>
            <h2>Username</h2>
            <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} className="input-forms"/>
            <h2>Password</h2>
            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-forms"/>
                <button
                    id="togglePW"
                    class="button"
                    type="button"
                    style="cursor:pointer;"
                    onclick={togglePassword()}></button>
                <ul class="lead list-group" id="requirements">
                    <li id="length" class="list-group-item">At least 8 characters</li>
                    <li id="lowercase" class="list-group-item">At least 1 lowercase letter</li>
                    <li id="uppercase" class="list-group-item">At least 1 uppercase letter</li>
                    <li id="number" class="list-group-item">At least 1 numerical number</li>
                    <li id="special" class="list-group-item">At least 1 special character</li>
                </ul>
                <h2>You will be redirected to the login page after sign up to log in.</h2>
            <button onClick={handleSubmit} className="button">Register</button>
        </form>
      </div>
    </>
  )
}