import "../styles/VenueResults.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import VenueCard from "../components/VenueCard";
import { api } from "../api";

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const VenueResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    // Fetch venue results based on the query
    fetch(`/api/venues?query=${query}`)
      .then(response => response.json())
      .then(data => setResults(data));
  }, [query]);

  return (
    <div>
      <h1>Venue Results</h1>
      <div className="results-container">
        {results.map(venue => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default VenueResults;

// export const EventsPage = () => {
//   const [venues, setVenues] = useState([]);
//   const location = useLocation();

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const zip = params.get("zip");
//     fetchVenuesByZip(zip);
//   }, [location]);

//   const fetchVenuesByZip = async (zip) => {
//     try {
//       const response = await api.get(`api/venues/?zip=${zip}`);
//       setVenues(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       {venues.map((ev, idx) => (
//         <VenueCard key={idx} ev={ev} />
//       ))}
//     </div>
//   );
// };