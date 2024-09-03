import React from "react";
import { api } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyEvents.css";
import { AddEventModal } from "../components/AddEventModal";


export const MyEvents = () => {
  const [addEventModalOpen, setAddEventModalOpen] = useState(false)

  return (
    <div>
    <button onClick={()=> setAddEventModalOpen(true)}>Add Event</button>
    <AddEventModal isOpen={addEventModalOpen} cancelBtn={() => setAddEventModalOpen(false)} />
  </div>
  )
};
