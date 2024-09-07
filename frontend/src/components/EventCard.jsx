import React from "react";

export default function EventCard({ eve, key, formatDate, className }) {
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
        <p>
          Price: ${Math.floor(eve.priceRanges[0].min)}-
          {Math.floor(eve.priceRanges[0].max)}
        </p>
      ) : null}
      {eve.priceRanges ? (
        <a href={eve.url} target="_blank">
          Get tickets
        </a>
      ) : (
        "Sold out"
      )}
      {/* </div> */}

      {/* <img
        className="card-img-top"
        src="public/flyer.png"
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{ev.event_name}</h5>
        <p className="card-text">EVENT DESCRIPTION GOES HERE ?</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Category: {ev.category}</li>
        <li className="list-group-item">Venue: {ev.venue}</li>
        <li className="list-group-item">City: {ev.city}</li>
        <li className="list-group-item">Time: {ev.time}</li>
        <li className="list-group-item">{ev.indoor ? "Indoor" : "Outdoor"}</li>
      </ul>
      <div className="card-body">
        <a href="#" className="card-link">
          Join Event
        </a>
        <a href={`events/${ev.id}`} className="card-link">
          More Details
        </a>
        <a href="#" className="card-link">
          Bookmark
        </a>
      </div> */}
    </div>
  );
}
