// import { useNavigate} from "react-router-dom"
import { useState, useEffect } from "react"
import { api } from "../api"
import "../styles/Home.css"

export const Home = () => {
  const [allEvents, setAllEvents] = useState([])

  useEffect(()=>{
    fetchAllEvents()
  },[])


  const fetchAllEvents = async()=>{
    try {
      const response = await api.get('api/events/')
      setAllEvents(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
        {allEvents.map((ev, idx) => (
          <div key={idx}>
            <h3>{ev.event_name}</h3>
            <p>Category: {ev.category}</p>
            <p>Venue: {ev.venue}</p>
            <p>City: {ev.city}</p>
            <p><span>Time: {ev.time}</span> <span>{ev.indoor ? "Indoor" : "Outdoor"}</span></p>
          </div>
        ))}
        
    </div>
  )
}
