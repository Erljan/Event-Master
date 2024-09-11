import React from "react";
import "../styles/VenueCard.css";
import { Link } from "react-router-dom";

const VenueCard = ({ venue, navigate, apikey }) => {
  // const { name, description, address, city, state, images } = venue;
  const backgroundImage = venue.images
    ? venue.images[0].url
    : "https://mnlht.com/wp-content/uploads/2017/06/no_image_placeholder.png";

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img className="card-img-top" src={backgroundImage} alt={venue.name} />
      <div className="card-body">
        <h5 className="card-title">{venue.name}</h5>
        <p className="card-text">
          {" "}
          {venue.address ? venue.address.line1 : "No address added"},{" "}
          {venue.country ? venue.country.name : "No country added"}
        </p>
        <Link to={venue.url} target="_blank">
          Buy Ticket
        </Link>
      </div>
    </div>
  );
};

export default VenueCard;
