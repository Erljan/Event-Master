import React from "react";
import "../styles/FoundEventCard.css";

const EventCard = ({ ev }) => {
  const { name, description, dates, images, _embedded } = ev;
  const location = _embedded.venues[0].location;
  const venue = _embedded.venues[0].name;

  
  return (
    <div className="event-card" style={{ backgroundImage: `url(${images[0].url})` }}>
      <div className="event-card-content">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{venue}</p>
        <p>{location.city}, {location.state}</p>
        <p>{new Date(dates.start.dateTime).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default EventCard;