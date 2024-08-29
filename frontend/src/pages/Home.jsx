// import { useNavigate} from "react-router-dom"
import { useState, useEffect } from "react";
import EventCard from "../components/EventCard";
import { api } from "../api";
import "../styles/Home.css";

export const Home = () => {
  const [allEvents, setAllEvents] = useState([]);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {

      const response = await api.get("api/events/");
      setAllEvents(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

//   const handleScroll = (e, category) => {
//     if (e.target.scrollWidth - e.target.scrollLeft === e.target.clientWidth && !loading
//         [category]) {
//         setPage(prevPage => ({ ...prevPage, [category]: prevPage[category] + 1 }));
//     }
// };

const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -1000, behavior: 'smooth' });
};

const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 1000, behavior: 'smooth' });
};

  // return (
  //   <div>
  //     {allEvents.map((ev, idx) => (
  //       <div key={idx}>
  //         <h3>{ev.event_name}</h3>
  //         <p>Category: {ev.category}</p>
  //         <p>Venue: {ev.venue}</p>
  //         <p>City: {ev.city}</p>
  //         <p>
  //           <span>Time: {ev.time}</span>{" "}
  //           <span>{ev.indoor ? "Indoor" : "Outdoor"}</span>
  //         </p>
  //         <a href="/">More Details</a>
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
    <div className="background1">
      <div className="container">
      <form action="/" method="GET" className="form">
        <input type="search" className="search-textbox" placeholder="Change Location" />
        <button type="submit" className="search-button">
          <img src="../src/images/search.png" />
        </button>
      </form>
      <form action="/" method="GET" className="form">
        <input type="search" className="search-textbox" placeholder="Search Venues" />
        <button type="submit" className="search-button">
          <img src="../src/images/search.png" />
        </button>
      </form>
    </div>
    <container>
      <div className="category">Events Near You</div>
      <button className="arrow arrow-left" onClick={() => scrollLeft(rowRef)}>&lt;</button>
      {allEvents.map((ev, idx) => (
        <div key={idx}>
          <EventCard ev={ev} />
        </div>
      ))};
      <button className="arrow arrow-right" onClick={() => scrollRight(rowRef)}>&gt;</button>
    </container>
    <container>
      <div className="category">Suggested Events</div>
    </container>
    <container>
      <div className="category">Recently Viewed</div>
    </container>

    </div>
  );
};
