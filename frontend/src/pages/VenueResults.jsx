import "../styles/VenueResults.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import VenueCard from "../components/VenueCard";
import axios from "axios";
import EventCard from "../components/EventCard";

const VenueResults = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const apikey = import.meta.env.VITE_API_KEY;

  const navigate = useNavigate();

  useEffect(() => {
    fetchVenues(query);
  }, [query]);

  const fetchVenues = async (keyword) => {
    try {
      const response = await axios.get(
        `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${apikey}&keyword=${keyword}`
      );
      console.log("Venue search response:", response.data._embedded.venues); // Log the response data
      setResults(response.data._embedded.venues);
    } catch (error) {
      console.error("Error fetching venues", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVenues(searchText);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="search-container">
        <input
          className="input"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter search text..."
        />
        <button className="button" onClick={handleSearch}>
          <img className="img" src="./src/images/search.png" alt="Search" />
        </button>
      </div>
      <h1>Venue Results</h1>
      <div className="results-container">
        {results.length ? (
          results.map((venue) => (
            <VenueCard key={venue.id} venue={venue} apikey={apikey} />
            // <EventCard key={idx} formatDate={formatDate} eve={venue} className={"event-card"}
            // navigate={() => navigate(`/event/${venue.id}`)}/>
          ))
        ) : (
          <h3>There's no events near {query}</h3>
        )}
      </div>
    </div>
  );
};

export default VenueResults;
