import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/Home.css";
import "../styles/Film.css";
import EventCard from "../components/EventCard";

export default function Film() {
  const [loading, setLoading] = useState(false);
  const [zipCode, setZipCode] = useState(
    localStorage.getItem("zipCode") || 60601
  ); // Default to Chicago if no zipCode
  const [filmEvents, setFilmEvents] = useState([]);
  const filmRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchZipcode = async () => {
      try {
        const response = await api.get("api/profile/");
        const userZipCode = Number(response.data.location);
        setZipCode(userZipCode);
        localStorage.setItem("zipCode", userZipCode);
        fetchFilmEvents(userZipCode);
      } catch (error) {
        console.log(error);
        fetchFilmEvents(zipCode);
      }
    };
    fetchZipcode();
  }, []);

  const apikey = import.meta.env.VITE_API_KEY;

  // Function to get coordinates from the zip code
  const getCoordinateFromZip = async (zip) => {
    const geocodeKey = import.meta.env.VITE_LOCATION_KEY;
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${zip}&key=${geocodeKey}`
      );
      const { lat, lng } = response.data.results[0].geometry;
      return { lat, lng };
    } catch (error) {
      console.error("Error fetching coordinates", error);
      return { lat: 41.8781, lng: -87.6298 }; // Default to Chicago coordinates on error
    }
  };

  // Fetch film events based on the coordinates
  const fetchFilmEvents = async (zip) => {
    setLoading(true);
    try {
      const coordinates = await getCoordinateFromZip(zip);
      const { lat, lng } = coordinates;

      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&latlong=${lat},${lng}&classificationName=film&size=50`
      );

      const film = response.data._embedded?.events || [];

      // Sort the film events by date
      const sortedFilmEvents = film.sort((a, b) => {
        const dateA = new Date(a.dates.start.localDate);
        const dateB = new Date(b.dates.start.localDate);
        return dateA - dateB;
      });

      setFilmEvents(sortedFilmEvents);
    } catch (error) {
      console.error("Error fetching film events", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  console.log(filmEvents);

  return (
    <div className="homepage">
      {zipCode ? (
        <h1>Film events near you</h1>
      ) : (
        <h1>Film events near Chicago</h1>
      )}
      <div className="each-slide-container">
        <div className="each-slide1" ref={filmRef}>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            filmEvents.map((eve, idx) => (
              <EventCard
                key={idx}
                eve={eve}
                formatDate={formatDate}
                className={"event-card"}
                navigate={() => navigate(`/event/${eve.id}`)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
