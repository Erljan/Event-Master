// import React from "react";
import { Container } from 'react-bootstrap';
import { api } from "../api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/SignUp.css"

// import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";


export const RegisterForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [location, setLocation] = useState("")
    const navigate = useNavigate();

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
            <div className="signup-page">
              {/* <container className="signup-container"> */}
                <form onSubmit={handleSubmit} className="forms-login-register signup">
                  <h1 className="titletext">Create Your Account</h1>
                  {/* <p>First Name</p> */}
                  <input
                    type="text"
                    name="first_name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    className="input-forms-signup"
                    placeholder='First Name'
                  />
                  {/* <p>Last Name</p> */}
                  <input
                    type="text"
                    name="last_name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    className="input-forms-signup"
                    placeholder='Last Name'
                  />
                  {/* <p>Location (Zip Code)</p> */}
                  {/* <input
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="input-forms-signup"
                    placeholder='Location (Zip Code)'
                  /> */}
                  {/* <p>Email</p> */}
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-forms-signup"
                    placeholder='Email'
                  />
                  {/* <p>Username</p> */}
                  <input
                    type="text"
                    // name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-forms-signup"
                    placeholder='Username'
                  />
                  {/* <p>Password</p> */}
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      checkPassword();
                    }}
                    className="input-forms-signup"
                    placeholder='Password'
                  />
                  <button
                    id="togglePW"
                    className="show-pass"
                    type="button"
                    style={{ cursor: "pointer" }}
                    onClick={togglePassword}
                  >
                    Show Password
                  </button>
                  {/* <ul className="lead list-group" id="requirements">
                    <li id="length" className="list-group-item">
                      At least 8 characters
                    </li>
                    <li id="lowercase" className="list-group-item">
                      At least 1 lowercase letter
                    </li>
                    <li id="uppercase" className="list-group-item">
                      At least 1 uppercase letter
                    </li>
                    <li id="number" className="list-group-item">
                      At least 1 numerical number
                    </li>
                    <li id="special" className="list-group-item">
                      At least 1 special character
                    </li>
                  </ul> */}
                  <p >Already have an account? <span><Link to="/login" className='to-reg'>Login</Link></span></p>
                  <button type="submit" className="login-btn">
                    Register
                  </button>
                </form>
                {/* </container> */}
              </div>
          );
        };