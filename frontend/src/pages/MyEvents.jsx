import React, { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/MyEvents.css";
import axios from "axios";
import EventCard from "../components/EventCard";
import { throttle } from "lodash";
// import { AddEventModal } from "../components/AddEventModal";

export const MyEvents = () => {
  const [myEvents, setMyEvents] = useState([]);
  const [listEvents, setListEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [addEventModalOpen, setAddEventModalOpen] = useState(false)
  const navigate = useNavigate();
  const apikey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    getMyEvents();
  }, []);

  // Throttle function to limit requests
  const throttledFetchEventDetails = throttle(async (events, apikey) => {
    const eventPromises = events.map((event) =>
      axios.get(
        `https://app.ticketmaster.com/discovery/v2/events/${event.eventId}.json?apikey=${apikey}`
      )
    );
    try {
      const responses = await Promise.all(eventPromises);
      setListEvents(responses.map((response) => response.data));
    } catch (error) {
      console.log("Error pulling all of my events in API", error);
    } finally {
      setLoading(false);
    }
  }, 1000); // Throttle for 1 second

  useEffect(() => {
    if (myEvents.length > 0) {
      setLoading(true);
      throttledFetchEventDetails(myEvents, apikey);
    }
  }, [myEvents]);

  const getMyEvents = async () => {
    try {
      const response = await api.get("api/my-events/");
      setMyEvents(response.data);
    } catch (error) {
      console.log("Error pulling all of my events", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  const handleRemoveEvent = async (id) => {
    try {
      await api.delete(`api/my-events/${id}/`);
      // setAdded(false)
    } catch (error) {
      console.log("Error removing event", error);
    }
    getMyEvents();
  };

  if (!myEvents.length) {
    return (
      <div className="homepage">
        <h1>My Events</h1>
        <h3>No events</h3>
        <button onClick={() => navigate("/")}>Add Events</button>
      </div>
    );
  }

  return (
    <div className="homepage">
      <h1>My Events</h1>
      <div className="each-slide-container1">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        listEvents.map((event, idx) => (
          <div className="event-card" key={idx}>
            <h5>{event.name}</h5>
            <img src={event.images[0].url} alt={event.name} />
            <p>
              {event._embedded && event._embedded.venues ? (
                <span>
                  {event._embedded.venues[0].name},{" "}
                  {event._embedded.venues[0].city.name}
                </span>
              ) : (
                "Venue information not available"
              )}
            </p>
            <p>{formatDate(event.dates.start.localDate)}</p>
            <p>
              Time: {event.dates?.start?.localTime || "N/A"},{" "}
              {event.dates.timezone || "N/A"}
            </p>

            <button
              onClick={() => navigate(`/event/${event.id}`)}
              className="see-more"
            >
              See more
            </button>
            <button onClick={() => handleRemoveEvent(event.id)} className="remove-btn">
              Remove event
            </button>
          </div>
        ))
      )}
      </div>
    </div>
  );
};
