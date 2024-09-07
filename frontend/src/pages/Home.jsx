// import { useNavigate} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import FoundEventCard from "../components/EventCard";
import { api } from "../api";
import axios from "axios";
import "../styles/Home.css";

export const Home = () => {
  const [allEvents, setAllEvents] = useState([]);
  // const [upcomingEvents, setUpcomingEvents] = useState([]);
  // const defaultZipCode = "60601"; // Downtown Chicago zip code
  const rowRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [musicEvents, setMusicEvents] = useState([]);
  const [sportsEvents, setSportsEvents] = useState([])

  useEffect(() => {
    const userZipCode = "userSavedZipCode"; // Replace with actual user saved zip code
    const defaultZipCode = "60601"; // Downtown Chicago zip code
    // fetchEventsByLocation(userZipCode || defaultZipCode);
    fetchUpcomingEvents(userZipCode || defaultZipCode);
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

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
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
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&classificationName=sports&size=50`
      );

      const sports = sportsResponse.data._embedded.events

      const sportsUniqueEvents = []
      const seenMatchup = new Set()

      const normalizeTeams = (team1, team2) => {
        const teams = [team1, team2].sort()
        return `${teams[0]} vs ${teams[1]}`
      }

      sports.forEach(event => {
        if (event.name.includes("vs") && sportsUniqueEvents.length < 10){
          const [team1, team2] = event.name.split(" vs ")
          const normalizedMatchup = normalizeTeams(team1, team2)

          if(!seenMatchup.has(normalizedMatchup)) {
            seenMatchup.add(normalizedMatchup)
            sportsUniqueEvents.push(event)
          }
        }
      })


      setMusicEvents(musicUniqueEvents);
      setSportsEvents(sportsUniqueEvents)
      // console.log(musicUniqueEvents);
      console.log(sportsUniqueEvents);
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

      {/* 10 current SPORTS events */}

      <div>
        {
          loading ? (
            <div className="spinner"></div>
          ) : (
            sportsEvents.map((eve, idx) => (
              <div key={idx} className="event-cards">
                <h6>{eve.name}</h6>
                <img src={eve.images[0].url} alt="" />

              </div>
            ))
          )
        }
      </div>


      {/* 10 current MUSIC events */}

      <div>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          musicEvents.map((eve, idx) => (
            <div key={idx} className="event-cards">
              <h6>{eve.name}</h6>
              <img src={eve.images[0].url} alt="" />
              <p>
                {eve._embedded && eve._embedded.venues ? (
                  <span>
                    {eve._embedded.venues[0].name}, {eve._embedded.venues[0].city.name}
                  </span>
                ) : (
                  "Venue information not available"
                )}
              </p>
              <p>
                {formatDate(eve.dates.start.localDate)}
              </p>
              <p>
                {eve.priceRanges ? (
                  <p>
                    Price: ${Math.floor(eve.priceRanges[0].min)}-
                    {Math.floor(eve.priceRanges[0].max)}
                  </p>
                ) : (
                  null
                )}
                {eve.priceRanges ? <a href={eve.url} target="_blank">Get tickets</a> : "Sold out"}
              </p>
            </div>
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
