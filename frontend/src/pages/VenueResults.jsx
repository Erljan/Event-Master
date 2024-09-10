import "../styles/VenueResults.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import VenueCard from "../components/VenueCard";
import axios from 'axios';


const VenueResults = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const apikey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchVenues(query);
  }, [query]);

  const fetchVenues = async (keyword) => {
    try {
      const response = await axios.get(`https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${apikey}&keyword=${keyword}`);
      console.log('Venue search response:', response.data._links.self.href); // Log the response data
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
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div>
      <h1>Venue Results</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter search text..."
        />
        <button onClick={handleSearch}>
          <img src="path/to/your/search-icon.png" alt="Search" />
        </button>
      </div>
      <div className="results-container">
        {results.map(venue => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default VenueResults;