import "../styles/EventResults.css"
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import { api } from "../api";

const EventResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    // Fetch event results based on the query
    fetch(`/api/events?query=${query}`)
      .then(response => response.json())
      .then(data => setResults(data));
  }, [query]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h1>Event Results</h1>
      <div className="results-container">
        {results.map(event => (
          <EventCard 
            key={event.id} 
            eve={event} 
            formatDate={formatDate} 
            className="event-card" 
            navigate={() => navigate(`/event/${event.id}`)} />
        ))}
      </div>
    </div>
  );
};

export default EventResults;


// export const EventsPage = () => {
//   const [events, setEvents] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const zip = params.get("zip");
//     fetchEventsByZip(zip);
//   }, [location]);

//   const fetchEventsByZip = async (zip) => {
//     try {
//       const response = await api.get(`api/events/?zip=${zip}`);
//       setEvents(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       {events.map((ev, idx) => (
//         <EventCard key={idx} ev={ev} />
//       ))}
//     </div>
//   );
// };