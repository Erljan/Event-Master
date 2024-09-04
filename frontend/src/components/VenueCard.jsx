import React from "react";
import "../styles/VenueCard.css";



const VenueCard = ({ venue }) => {
  const { name, description, address, city, state, images } = venue;

  return (
    <div className="venue-card" style={{ backgroundImage: `url(${images[0].url})` }}>
      <div className="venue-card-content">
        <h3>{name}</h3>
        <p>{description}</p>
        <p>{address.line1}</p>
        <p>{city}, {state}</p>
      </div>
    </div>
  );
};

export default VenueCard;