import React from "react";
import "../styles/VenueCard.css";
import { Link } from "react-router-dom";




const VenueCard = ({ venue, navigate, apikey }) => {
  // const { name, description, address, city, state, images } = venue;
  const backgroundImage = venue.images ? venue.images[0].url : "https://mnlht.com/wp-content/uploads/2017/06/no_image_placeholder.png"

  return (
    <div className="venue-card" style={{ backgroundImage: `url(${backgroundImage})` }} className="event-card">
      <div className="venue-card-content">
        <h5>{venue.name}</h5>
        {/* <p>{venue.country.name} {venue.address.line1}</p> */}
        <p>{venue.address ? venue.address.line1 : "No address added"}, {venue.country ? venue.country.name : "No country added" }</p>
        {/* <p>{city}, {state}</p> */}
        <Link to={venue.url} target="_blank">Buy Ticket</Link>
      </div>
    </div>
  );
};

export default VenueCard;