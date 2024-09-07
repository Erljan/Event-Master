import { api } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/EventPage.css";
import React from "react";
import axios from "axios";

export default function EventPage() {
  const { id } = useParams();
  const [aEvent, setAEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=${apiKey}`
      );

      setAEvent(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  if (!aEvent) return <div>Loading</div>;

  return (
    // <div className="event-page">
      <div className="event-container">
        <div className="left-side">
        {aEvent ? (
          <div>
            <h2>{aEvent.name}</h2>

            <img src={aEvent.images[0].url} alt={aEvent.name} />

            <p>{aEvent.pleaseNote ? aEvent.pleaseNote : null}</p>
          </div>
        ) : (
          <div className="spinner"></div>
        )}

        </div>
        <div className="info">
        <h5>
          Venue:{" "}
          {aEvent._embedded.venues[0].name
            ? `${aEvent._embedded.venues[0].name}, ${aEvent._embedded.venues[0].state.stateCode} ${aEvent._embedded.venues[0].postalCode}`
            : "N/A"}
        </h5>
        {aEvent.priceRanges ? (
          <div>
            <p>
              Price range: ${aEvent.priceRanges[0]?.min}-
              {aEvent.priceRanges[0]?.max} {aEvent.priceRanges[0]?.currency}
            </p>

            <p>Date: {formatDate(aEvent.dates?.start?.localDate) || "N/A"} </p>
            <p>
              Time: {aEvent.dates?.start?.localTime || "N/A"},{" "}
              {aEvent.dates.timezone || "N/A"}
            </p>
            <p>Accessibility: {aEvent.accessibility.info}</p>
            <button className="buy-ticket-btn">

            <a href={aEvent.url} target="_blank">Buy Ticket</a>
            </button>
            <button className="add-btn">Add to my events</button>
          </div>
        ) : (
          "Sold out"
        )}
      </div>
      </div>
    // </div>
  );
}
