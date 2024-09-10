import React, { useEffect } from "react";
import { api } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"
import { UpdateProfileModal } from "../components/UpdateProfileModal";
import { AddEventModal } from "../components/AddEventModal";


export const Profile = () => {
  const [username, setUsername] = useState("")
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [zipcode, setZipcode] = useState("")
  const [addEventModalOpen, setAddEventModalOpen] = useState(false)



  const [newFname, setNewFname] = useState("")
  const [newLname, setNewLname] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newBio, setNewBio] = useState("")
  const [newZipcode, setNewZipcode] = useState("")


  const [isModalOpen, setIsModalOpen] = useState(false)

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
      setZipcode(response.data.location)

      localStorage.setItem('zipCode', response.data.location)
    } catch (error) {
      console.log(error)
    }
  }


  const updateProfile = async() => {

    try {
      await api.put("api/profile/update/", {
        user: {

          first_name: newFname ? newFname : fname,
          last_name: newLname ? newLname : lname ,
          email: newEmail ? newEmail : email,
        },
        bio: newBio ? newBio : bio,
        location: newZipcode ? newZipcode : zipcode,
      })

      if(newZipcode){
        localStorage.setItem('zipCode', newZipcode)
        setNewZipcode(newZipcode)
      }

      fetchProfileInfo()
    } catch (error) {
      console.log(error)
      
    }
  }


  return (
    <div className="profile-page">
    <div className="profile-container">
      <div className="profile">
        <p className="profile-info"><span>{fname}</span> <span>{lname}</span></p>
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg" alt="" />
        <h5>@{username}</h5>
        <p className="profile-info">{email}</p>
        <p>{zipcode ? zipcode : "No current zipcode"}</p>
        <button className="button" onClick={() => setIsModalOpen(true)}>Update Profile</button>

      </div>
  
      <div className="profile-bio">
        <p className="profile-info">{bio ? bio : "No Bio"}</p>
      </div>
  
      {isModalOpen && (
        <div className="profile-modal">
          <UpdateProfileModal
            onSubmit={updateProfile}
            onClose={() => setIsModalOpen(false)}
            isOpen={isModalOpen}
            newLname={newLname}
            newFname={newFname}
            newEmail={newEmail}
            zipcode={zipcode}
            newBio={newBio}
            setNewBio={setNewBio}
            setNewEmail={setNewEmail}
            setNewFname={setNewFname}
            setNewLname={setNewLname}
            setNewZipcode={setNewZipcode}
          />
        </div>
      )}
    </div>
    <div className="header2">
        <p>YourEvents</p>
    </div>
    <button onClick={()=> setAddEventModalOpen(true)}>Create Event</button>
    <AddEventModal isOpen={addEventModalOpen} cancelBtn={() => setAddEventModalOpen(false)} />
    <div className="events-box">

        <p>Interests</p>
        <div className="interests">
          <p>Hiking</p>
          <p>Biking</p>
          <p>Classical Music</p> 
        </div>

        <p>Upcoming Events</p>
          <div className="interests">
            <p>Empty</p>
          </div>

        <p>Events You're Running</p>
          <div className="interests">
            <p>Empty</p>
          </div>
    </div>
    </div>
  );
}