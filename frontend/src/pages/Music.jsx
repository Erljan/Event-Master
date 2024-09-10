import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/Home.css";
import "../styles/Music.css";
import EventCard from "../components/EventCard";

export const Music = () => {
  const [loading, setLoading] = useState(false);
  const [zipCode, setZipCode] = useState(
    localStorage.getItem("zipCode") || 60601
  ); // Default to Chicago if no zipCode
  const [musicEvents, setMusicEvents] = useState([]);
  const musicRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchZipcode = async () => {
      try {
        const response = await api.get("api/profile/");
        const userZipCode = Number(response.data.location);
        setZipCode(userZipCode);
        localStorage.setItem("zipCode", userZipCode);
        fetchMusicEvents(userZipCode);
      } catch (error) {
        console.log(error);
        fetchMusicEvents(zipCode);
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

  // Fetch music events based on the coordinates
  const fetchMusicEvents = async (zip) => {
    setLoading(true);
    try {
      const coordinates = await getCoordinateFromZip(zip);
      const { lat, lng } = coordinates;

      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&latlong=${lat},${lng}&classificationName=music&size=50`
      );

      const music = response.data._embedded?.events || [];

      // Sort the music events by date
      const sortedMusicEvents = music.sort((a, b) => {
        const dateA = new Date(a.dates.start.localDate);
        const dateB = new Date(b.dates.start.localDate);
        return dateA - dateB;
      });

      setMusicEvents(sortedMusicEvents);
    } catch (error) {
      console.error("Error fetching music events", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  console.log(musicEvents);

  return (
    <div className="homepage">
      {zipCode ? (
        <h1>Music events near you</h1>
      ) : (
        <h1>Music events near Chicago</h1>
      )}
      <div className="each-slide-container">
        <div className="each-slide1" ref={musicRef}>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            musicEvents.map((eve, idx) => (
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
};
