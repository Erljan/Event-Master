// import { useNavigate} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import FoundEventCard from "../components/EventCard";
import { api } from "../api";
import axios from "axios";
import "../styles/Home.css";
import EventCard from "../components/EventCard";

export const Home = () => {
  // const [allEvents, setAllEvents] = useState([]);
  // const [upcomingEvents, setUpcomingEvents] = useState([]);
  // const defaultZipCode = "60601"; // Downtown Chicago zip code
  const [loading, setLoading] = useState(false);
  const [zipCode, setZipCode] = useState(60601)
  const [nearEvents, setNearEvents] = useState([])
  const rowRef = useRef(null);
  const navigate = useNavigate();

  const [musicEvents, setMusicEvents] = useState([]);
  const [sportsEvents, setSportsEvents] = useState([])

  useEffect(() => {
    // const userZipCode = "userSavedZipCode"; // Replace with actual user saved zip code
    // fetchEventsByLocation(userZipCode || defaultZipCode);
    // fetchUpcomingEvents(userZipCode || defaultZipCode);
    getCoordinateFromZip(13602)
    fetchAllEvents();
  }, []);

  // const fetchEventsByLocation = async (zipCode) => {
  //   try {
  //     const response = await api.get(`api/events/?zip=${zipCode}/`);
  //     setAllEvents(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const apikey = import.meta.env.VITE_API_KEY;
  
  
  const getCoordinateFromZip = async(zipCode) => {
    const geocodeKey = import.meta.env.VITE_LOCATION_KEY
    const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${geocodeKey}`)
    const results = response.data.results[0]
    return results ? results.geometry : null
  }

  const fetchAllEvents = async () => {
    setLoading(true);
    try {

      // The code below grabs the event by zipcode
      const coordinates = await getCoordinateFromZip(zipCode)
      if(!coordinates){
        console.log("Coordinates not found")
        return
      }

      const { lat, lng } = coordinates

      const eventsResponse = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&latlong=${lat},${lng}&size=50`)
      const eventData = eventsResponse.data._embedded.events

      const nearUniqueEvents = []
      const seenNearEvents = new Set()

      eventData.forEach((event) => {
        if (!seenNearEvents.has(event.name) && nearUniqueEvents.length < 10){
          seenNearEvents.add(event.name)
          nearUniqueEvents.push(event)
        }
      })

      // This code below calls for the MUSIC events
      const musicResponse = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&classificationName=music&apikey=${apikey}&size=100`
      );

      const music = musicResponse.data._embedded.events;

      // The code below grabs only 10 unique music events
      const musicUniqueEvents = [];
      const seenEvent = new Set();
      music.forEach((event) => {
        if (!seenEvent.has(event.name) && musicUniqueEvents.length < 10) {
          seenEvent.add(event.name);
          musicUniqueEvents.push(event);
        }
      });


      // This code below calls the SPORTS events
      const sportsResponse = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&classificationName=sports&apikey=${apikey}&size=50`
      );
  
      const sports = sportsResponse.data._embedded.events;
  
      // Get 10 unique SPORTS events
      const sportsUniqueEvents = [];
      const seenMatchups = new Set();
  
      const normalizeMatchup = (eventName) => {
        const parts = eventName.split(" vs ");
        if (parts.length === 2) {
          const [team1, team2] = parts;
          return `${team1.trim()} vs ${team2.trim()}`;
        }
        return eventName.trim();
      };
  
      sports.forEach((event) => {
        const normalizedName = normalizeMatchup(event.name);
  
        if (!seenMatchups.has(normalizedName) && sportsUniqueEvents.length < 10) {
          seenMatchups.add(normalizedName);
          sportsUniqueEvents.push(event);
        }
      });


      setMusicEvents(musicUniqueEvents);
      setSportsEvents(sportsUniqueEvents)
      setNearEvents(nearUniqueEvents)
      // console.log(musicUniqueEvents);
      console.log(nearUniqueEvents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingEvents = async (zipCode) => {
    try {
      const response = await api.get(`api/events/upcoming/?zip=${zipCode}/`);
      const sortedEvents = response.data.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
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
    ref.current.scrollBy({ left: -1000, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 1000, behavior: "smooth" });
  };



  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric'}
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, options)
  }

  return (
    <div className="homepage">

      {/* 10 current NEAR events */}

        <h1>Events near you</h1>
      <div className="each-slide">
        {
          loading ? (
            <div className="spinner"></div>
          ) : (
            nearEvents.map((eve, idx) => (
              <EventCard key={idx} eve={eve} formatDate={formatDate} className={"event-card"}/>
            ))
          )
        }

      </div>


      {/* 10 current SPORTS events */}

        <h1>Sports events</h1>
      <div className="each-slide">
        {
          loading ? (
            <div className="spinner"></div>
          ) : (
            sportsEvents.map((eve, idx) => (
              <EventCard key={idx} eve={eve} formatDate={formatDate} className={"event-card"}/>
            ))
          )
        }

      </div>


      {/* 10 current MUSIC events */}

        <h1>Music events</h1>
      <div className="each-slide">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          musicEvents.map((eve, idx) => (
            <EventCard key={idx} eve={eve} formatDate={formatDate} className={"event-card"}/>
          ))
        )}

      </div>

      {/* <div className="container">
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
      </div> */}
    </div>
  );
};
