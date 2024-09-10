import "../styles/EventResults.css"
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import axios from 'axios'


const EventResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const apikey = import.meta.env.VITE_API_KEY; 
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    fetchEvents(query);
  }, [query]);

  const fetchEvents = async (keyword) => {
    try {
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apikey}&keyword=${keyword}&size=50`);
      setResults(response.data._embedded.events);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="event-results">
      <div className="search-container">
        <input className="input"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter search text..."/>
        <button className="button" onClick={handleSearch}>
          <img className="img"src="./src/images/search.png" alt="Search"/>
        </button> 
      </div>
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