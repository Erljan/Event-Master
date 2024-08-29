import { useState } from "react";
import { api } from "../api";



export const AddEventModal = ({isOpen, cancelBtn}) => {
    
    const [eventName, setEventName] = useState("")
    const [venue, setVenue] = useState("")
    const [city, setCity] = useState("")
    const [category, setCategory] = useState("")
    const [time, setTime] = useState("")
    const [amPm, setAmPm] = useState("")
    const [timezone, setTimezone] = useState("")
    const [indoor, setIndoor] = useState(true)
    
    // This is to open the modal
    if(!isOpen) return null;

    const addEvent = async() => {
        // e.preventDefault()
            
        const fullTime = `${time} ${amPm} ${timezone}`;

        try {
            await api.post(`api/events/`, {
                event_name: eventName,
                venue: venue,
                city: city,
                category: category,
                time: fullTime,
                indoor: indoor
            })

            
        } catch (error) {
            console.log(error)
        }
    }

    // const handleRadioChange = (e) => {
    //     setEventType(e.target.value === "true")
    // }

  return (
    <div>
        <form action="" onSubmit={addEvent}>
            <input type="text" value={eventName} onChange={(e)=> setEventName(e.target.value)} placeholder="Event Name" />
            <br />
            <input type="text" value={venue} onChange={(e)=> setVenue(e.target.value)} placeholder="Venue" />
            <br />
            <input type="text" value={city} onChange={(e)=> setCity(e.target.value)} placeholder="City" />
            <br />
            <input type="text" value={category} onChange={(e)=> setCategory(e.target.value)} placeholder="Category" />
            <br />

            <input type="time" value={time} onChange={(e)=> setTime(e.target.value)} placeholder="Time" />
            <select name="" id="" value={amPm} onChange={(e) => setAmPm(e.target.value)}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>

            <select name="" id="" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                <option value="EST">EST</option>
                <option value="CST">CST</option>
                <option value="MST">MST</option>
                <option value="PST">PST</option>
            </select>

            <br />
            <label htmlFor="indoor">Indoor</label>
            <input type="radio" name="indoor" id="" value={true} onChange={()=> setIndoor(true)}/>
            <label htmlFor="outdoor">Outdoor</label>
            <input type="radio" name="indoor" id="" value={false} onChange={()=> setIndoor(false)} />

            <br />
            <input type="submit" name="Submit" id="" />
        </form>
        
        <button onClick={cancelBtn}>Cancel</button>
    </div>
  )
}
