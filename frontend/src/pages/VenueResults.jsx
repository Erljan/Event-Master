import "../styles/VenueResults.css"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import VenueCard from "../components/VenueCard";
import { api } from "../api";

export const EventsPage = () => {
  const [venues, setVenues] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const zip = params.get("zip");
    fetchVenuesByZip(zip);
  }, [location]);

  const fetchVenuesByZip = async (zip) => {
    try {
      const response = await api.get(`api/venues/?zip=${zip}`);
      setVenues(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {venues.map((ev, idx) => (
        <VenueCard key={idx} ev={ev} />
      ))}
    </div>
  );
};