// import { useNavigate} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import FoundEventCard from "../components/EventCard";
import { api } from "../api";
import axios from "axios";
import "../styles/Home.css";

export const Home = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const navigate = useNavigate();
  const rowRef = useRef(null);
  const defaultZipCode = "60601"; // Downtown Chicago zip code


  useEffect(() => {
    const userZipCode = "userSavedZipCode"; // Replace with actual user saved zip code
    const defaultZipCode = "60601"; // Downtown Chicago zip code
    // fetchEventsByLocation(userZipCode || defaultZipCode);
    fetchUpcomingEvents(userZipCode || defaultZipCode);
    fetchAllEvents()
  }, 
 []
);


// const fetchEventsByLocation = async (zipCode) => {
//   try {
//     const response = await api.get(`api/events/?zip=${zipCode}/`);
//     setAllEvents(response.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

const apikey = import.meta.env.VITE_API_KEY


const fetchAllEvents = async () => {
  try {
    const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=${apikey}`);
    setAllEvents(response.data);
    console.log(response.data)
  } catch (error) {
    console.log(error);
  }
};

const fetchUpcomingEvents = async (zipCode) => {
  try {
    const response = await api.get(`api/events/upcoming/?zip=${zipCode}/`);
    const sortedEvents = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
    setUpcomingEvents(sortedEvents);
  } catch (error) {
    console.log(error);
  }
};


  const handleSearch = (e, type) => {
    e.preventDefault();
    const zipCode = e.target.elements.search.value;
    if (type === "events") {
      navigate.push(`/eventresults?zip=${zipCode}`);
    } else if (type === "venues") {
      navigate.push(`/venueresults?zip=${zipCode}`);
    }
  };

//   const handleScroll = (e, category) => {
//     if (e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth && !loading
//         [category]) {
//         setPage(prevPage => ({ ...prevPage, [category]: prevPage[category] + 1 }));
//     }
// };

const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -1000, behavior: 'smooth' });
};

const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 1000, behavior: 'smooth' });
};


  return (
    <div className="background1">
      <div className="container">
      <form onSubmit={(e) => handleSearch(e, "events")} className="form">
          <input type="search" name="search" className="search-textbox" placeholder="Change Location" />
          <button type="submit" className="search-button">
            <img src="../src/images/search.png" alt="Search" />
          </button>
        </form>
        <form onSubmit={(e) => handleSearch(e, "venues")} className="form">
          <input type="search" name="search" className="search-textbox" placeholder="Search Venues" />
          <button type="submit" className="search-button">
            <img src="../src/images/search.png" alt="Search" />
          </button>
        </form>
    </div>
    <div className="container">
        <div className="category">Events Near You</div>
        <button className="arrow arrow-left" onClick={() => scrollLeft(rowRef)}>&lt;</button>
        <div ref={rowRef} className="events-row">
          {/* {allEvents.map((ev, idx) => (
            <div key={idx}>
              <FoundEventCard ev={ev} />
            </div>
          ))} */}
        </div>
        <button className="arrow arrow-right" onClick={() => scrollRight(rowRef)}>&gt;</button>
      </div>
      <div className="container">
        <div className="category">Upcoming Events</div>
        <div className="events-row">
          {upcomingEvents.map((ev, idx) => (
            <div key={idx}>
              <FoundEventCard ev={ev} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
