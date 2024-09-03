import React, { useEffect } from "react";
import { api } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"


export const Profile = () => {
  const [username, setUsername] = useState("")
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")

  useEffect(() => {
    fetchProfileInfo()
  }, [])

  const fetchProfileInfo = async() => {

    try {
      const response = await api.get("api/profile/")
      setUsername(response.data.user.username)
      setFname(response.data.user.first_name)
      setLname(response.data.user.last_name)
      setEmail(response.data.user.email)
      setBio(response.data.bio)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <h5>@{username}</h5>
      <p><span>{fname}</span> <span>{lname}</span></p>
      <p>{email}</p>
      <p>{bio ? bio : "No Bio"}</p>
    </div>
  )
}
