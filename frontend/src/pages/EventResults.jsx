import "../styles/EventResults.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import EventCard from "../components/EventCard";
import { api } from "../api";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const zip = params.get("zip");
    fetchEventsByZip(zip);
  }, [location]);

  const fetchEventsByZip = async (zip) => {
    try {
      const response = await api.get(`api/events/?zip=${zip}`);
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {events.map((ev, idx) => (
        <EventCard key={idx} ev={ev} />
      ))}
    </div>
  );
};