import React from "react";

export default function EventCard({ eve, formatDate, className, navigate }) {
  // Check if the event is sold out by looking at the status code
  const isSoldOut = eve.dates?.status?.code === "soldout";



  return (
    <div className={className}>
      <h5>{eve.name}</h5>
      <img src={eve.images[0].url} alt={eve.name} />
      <p>
        {eve._embedded && eve._embedded.venues ? (
          <span>
            {eve._embedded.venues[0].name}, {eve._embedded.venues[0].city.name}
          </span>
        ) : (
          "Venue information not available"
        )}
      </p>
      <p>{formatDate(eve.dates.start.localDate)}</p>
      {/* Check if the event is sold out or if tickets are available */}
      {isSoldOut ? (
        <p className="sold-out">Sold Out</p>
      ) : (
        <a
          href={eve.url}
          target="_blank"
          rel="noopener noreferrer"
          className="buy-ticket-btn"
        >
          Buy Tickets
        </a>
      )}
      <button onClick={navigate} className="see-more">
        See more
      </button>
    </div>
  );
}
