import { api } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/EventPage.css";
import React from "react";

export default function EventPage() {
  const { id } = useParams();
  const [aEvent, setAEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await api.get(`/api/events/${id}`);
      setAEvent(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {aEvent ? (
        <>
          <h1>{aEvent.event_name}</h1>
          <p>Venue: {aEvent.venue}</p>
          <p>City: {aEvent.city}</p>
          <p>Category: {aEvent.category}</p>
          <p>Time: {aEvent.time}</p>
        </>
      ) : (
        <>No Event Found</>
      )}
    </div>
  );
}
