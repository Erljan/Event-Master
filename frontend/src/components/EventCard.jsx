import React from "react";



export default function EventCard({ eve, key, formatDate, className, navigate }) {
  return (
    <div className={className} key={key}>
      <h5>{eve.name}</h5>
      <img src={eve.images[0].url} alt="" />
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


      {eve.priceRanges ? (
        <button className="buy-ticket-btn" >
         
          <a href={eve.url} target="_blank">
          Buy ticket
        </a>
          </button>
      ) : (
        "Sold out"
      )}


      <button onClick={navigate} className="see-more">See more</button>
    </div>
  );
}
