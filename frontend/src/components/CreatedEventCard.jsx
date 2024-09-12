import React from "react";
import "../styles/CreatedEventCard.css";
import { api } from "../api";

export default function CreatedEventCard({ event, fetchEventsCreated }) {
  const deleteEventBtn = async (id) => {
    try {
      await api.delete(`/api/events/${id}/delete/`); // Call the API to delete the event
      fetchEventsCreated(); // Refresh the event list after successful deletion
    } catch (error) {
      console.log("Error deleting event", error);
    }
  };

  const dateStr = event.date;
  const date = new Date(dateStr);

  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <div className="card" style={{ width: "18rem" }}>
      <h5>{event.event_name}</h5>
      <img
        className="card-img-top"
        src={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHXX6GrLiyiN5oDkH8Badn80xAnC5oAumGmchxXoF-b4H9ZDDOJ_iexVov_mSiLU9UCI0&usqp=CAU"
        }
        alt="Card image cap"
      />
      <div className="card-body">
        <p>
          <span>
            {event.venue},{event.city}
          </span>
        </p>
        <p>{formattedDate}</p>
        <p>Time: {event.time}</p>
        <button onClick={() => deleteEventBtn(event.id)} className="remove-btn">
          Delete event
        </button>
      </div>
    </div>
  );
}
