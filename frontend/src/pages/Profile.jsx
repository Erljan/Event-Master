import React from "react";
import { api } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css"
import { AddEventModal } from "../components/AddEventModal";

export const Profile = () => {
  const [addEventModalOpen, setAddEventModalOpen] = useState(false)

  return (
    // <div>Profile</div>
    <div>
      <button onClick={()=> setAddEventModalOpen(true)}>Add Event</button>
      <AddEventModal isOpen={addEventModalOpen} cancelBtn={() => setAddEventModalOpen(false)}/>
    </div>
  )
}
