// import { useNavigate} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import FoundEventCard from "../components/EventCard";
import { api } from "../api";
import axios from "axios";
import "../styles/Home.css";
import EventCard from "../components/EventCard";

export const Home = () => {
  const [loading, setLoading] = useState({
    near: false,
    sports: false,
    music: false,
    //added separate loading states for each category so they don't trigger 
    // loading of eachother all the time.
  });
  const [zipCode, setZipCode] = useState(localStorage.getItem('zipCode') || null);
  // localStorage.getItem('zipCode') || 
  const [nearEvents, setNearEvents] = useState([]);
  const nearRef = useRef(null);
  const sportsRef = useRef(null);
  const musicRef = useRef(null);
  const navigate = useNavigate();
  const [musicEvents, setMusicEvents] = useState([]);
  const [sportsEvents, setSportsEvents] = useState([]);
  const [page, setPage] = useState({
    near: 1,
    sports: 1,
    music: 1
  });
  // const { eventsAttending, addToAttending, removeFropmAttending } = useAttending();
  // const { eventsOwned, removeFromOwned} = useOwned();  

    // const fetchZipcode = async() => {
    //   try {
    //     const response = await api.get('api/profile/')
    //     setZipCode(Number(response.data.location))
    //     // console.log(Number(response.data.location))
    //     localStorage.setItem('zipCode', Number(response.data.location))
    //     getCoordinateFromZip(zipCode)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // fetchZipcode()

    useEffect(() => {
      const fetchZipcode = async() => {
        try {
          const response = await api.get('api/profile/')
          setZipCode(Number(response.data.location))
          console.log(Number(response.data.location))
          localStorage.setItem('zipCode', Number(response.data.location))
          getCoordinateFromZip(zipCode)
        } catch (error) {
          console.log(error)
        }
      }
      fetchZipcode()
      fetchAllEvents();
    }, []);
 

  const apikey = import.meta.env.VITE_API_KEY;
  
  const getCoordinateFromZip = async () => {
    const geocodeKey = import.meta.env.VITE_LOCATION_KEY;
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${zipCode ? zipCode : 60601}&key=${geocodeKey}`
        
      );

      console.log(zipCode)
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } catch (error) {
      console.error("Error fetching coordinates", error);
      return null;
    }
  };

  const fetchData = async (setData, page, category) => {
    try {
      setLoading(prevLoading => ({ ...prevLoading, [category]: true }));
      const coordinates = getCoordinateFromZip();
      if (!coordinates) {
        console.log("Coordinates not found");
        return;
      }
      const { lat, lng } = coordinates;
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&latlong=${lat},${lng}&size=10&page=${page}`
      );
      const newData = response.data._embedded.events;
      setData((prevData) => [...prevData, ...newData]);
      setLoading((prevLoading) => ({ ...prevLoading, [category]: true }));
      // changed set loading to true to make sure each loading state does not affect the other loading states
    } catch (error) {
      console.error(`Error fetching ${category} data`, error);
      setLoading((prevLoading) => ({ ...prevLoading, [category]: true }));
      // same as above comment
    }
  };

  const fetchAllEvents = async () => {
    setLoading(true);
    try {
      // The code below grabs the event by zipcode
      const coordinates = await getCoordinateFromZip(zipCode);
      if(!coordinates){
        console.log("Coordinates not found");
        return;
      }
      const { lat, lng } = coordinates
      const eventsResponse = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&latlong=${lat},${lng}&size=10`)
      const nearUniqueEvents = eventsResponse.data._embedded.events;
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
        `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&classificationName=sports&apikey=${apikey}&size=100`
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
      // console.log(nearUniqueEvents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };



  // const fetchUpcomingEvents = async (zipCode) => {
  //   try {
  //     const response = await api.get(`api/events/upcoming/?zip=${zipCode}/`);
  //     const sortedEvents = response.data.sort(
  //       (a, b) => new Date(a.date) - new Date(b.date)
  //     );
  //     setUpcomingEvents(sortedEvents);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSearch = (e, type) => {
    e.preventDefault();
    const zipCode = e.target.elements.search.value;
    if (type === "events") {
      navigate.push(`/eventresults?zip=${zipCode}`);
    } else if (type === "venues") {
      navigate.push(`/venueresults?zip=${zipCode}`);
    }
  };

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -1000, behavior: "smooth" });
  };

  const scrollRight = (ref, category) => {
    ref.current.scrollBy({ left: 1000, behavior: "smooth" });
    if (ref.current.scrollWidth - ref.current.scrollLeft === ref.current.clientWidth) {
      setPage((prevPage) => ({ ...prevPage, [category]: prevPage[category] + 1 
      }));
      fetchData(zipCode, category === "near" ? setNearEvents : category === "music" ? 
        setMusicEvents : setSportsEvents, page[category] + 1, category);
    }
  };

  const handleScroll = useCallback((ref, category) => {
    if (ref.current.scrollWidth - ref.current.scrollLeft === ref.current.clientWidth) {
      setPage((prevPage) => ({ ...prevPage, [category]: prevPage[category] + 1 
      }));
      fetchData(zipCode, category === "near" ? setNearEvents : category === "music" ? 
        setMusicEvents : setSportsEvents, page[category] + 1, category);
    }
  }, [zipCode, page]);


  useEffect(() => {
    const nearNode = nearRef.current;
    const sportsNode = sportsRef.current;
    const musicNode = musicRef.current;

    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleScroll(nearRef, "near");
        }
      },
      { threshold: 1.0 }
    );

    const sportsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleScroll(sportsRef, "sports");
        }
      },
      { threshold: 1.0 }
    );

    const musicObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleScroll(musicRef, "music");
        }
      },
      { threshold: 1.0 }
    );

    if (nearNode) nearObserver.observe(nearNode);
    if (sportsNode) sportsObserver.observe(sportsNode);
    if (musicNode) musicObserver.observe(musicNode);

    return () => {
      if (nearNode) nearObserver.unobserve(nearNode);
      if (sportsNode) sportsObserver.unobserve(sportsNode);
      if (musicNode) musicObserver.unobserve(musicNode);
    };
  }, [handleScroll]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric'}
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, options)
  }


  return (
    <div className="homepage">
      <h1>Events near you</h1>
      <div className="each-slide-container">
        <button className="scroll-arrow left" onClick={() => scrollLeft(nearRef)}>{"<"}</button>
        <div className="each-slide" ref={nearRef}>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            nearEvents.map((eve, idx) => (
              <EventCard key={idx} eve={eve} formatDate={formatDate} className={"event-card"} 
                navigate={() => navigate(`/event/${eve.id}`)} />
            ))
          )}
        </div>
        <button className="scroll-arrow right" onClick={() => scrollRight(nearRef, "near")}>{">"}</button>
      </div>
      <h1>Sports events</h1>
      <div className="each-slide-container">
        <button className="scroll-arrow left" onClick={() => scrollLeft(sportsRef)}>{"<"}</button>
        <div className="each-slide" ref={sportsRef}>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            sportsEvents.map((eve, idx) => (
              <EventCard key={idx} eve={eve} formatDate={formatDate} className={"event-card"} navigate={() => navigate(`/event/${eve.id}`)} />
            ))
          )}
        </div>
        <button className="scroll-arrow right" onClick={() => scrollRight(sportsRef, "sports")}>{">"}</button>
      </div>
      <h1>Music events</h1>
      <div className="each-slide-container">
        <button className="scroll-arrow left" onClick={() => scrollLeft(musicRef)}>{"<"}</button>
        <div className="each-slide" ref={musicRef}>
          {loading ? (
          <div className="spinner"></div>
        ) : (
          musicEvents.map((eve, idx) => (
            <EventCard key={idx} eve={eve} formatDate={formatDate} className={"event-card"} 
              navigate={()=>navigate(`/event/${eve.id}`)}/>
          ))
        )}
        </div>
      </div>
    </div>
  );
};
