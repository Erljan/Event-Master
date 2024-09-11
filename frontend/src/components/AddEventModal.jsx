import React, { useState } from "react";
import { api } from "../api";
import "../styles/AddEventModal.css";

export default function AddEventModal() {
  const [eventName, setEventName] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [time, setTime] = useState("");
  const [amPm, setAmPm] = useState("AM");
  const [timezone, setTimezone] = useState("EST");
  const [indoor, setIndoor] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const addEvent = async () => {
    const fullTime = `${time} ${amPm} ${timezone}`;

    console.log({
      event_name: eventName,
      venue: venue,
      city: city,
      category: category,
      time: fullTime,
      indoor: indoor,
    });

    try {
      const response = await api.post("api/events/", {
        event_name: eventName,
        venue: venue,
        city: city,
        category: category,
        time: fullTime,
        indoor: indoor,
      });

      console.log("API response: ", response);

      // Clear form fields upon successful submission
      setEventName("");
      setVenue("");
      setCity("");
      setCategory("");
      setTime("");
      setAmPm("AM");
      setTimezone("EST");
      setIndoor(true);
      setErrorMessage("");

      const modalElement = document.getElementById("exampleModal");
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
    } catch (error) {
      console.error("Error saving event:", error);
      setErrorMessage("Error saving event. Please try again.");
    }
  };

  const handleModalClose = () => {
    setErrorMessage("");
  };

  return (
    <div className="center-button-container">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={handleModalClose}
      >
        Create Event
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={handleModalClose}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New Event
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleModalClose}
              ></button>
            </div>
            <div className="modal-body">
              <div>
                {errorMessage && (
                  <div className="alert alert-danger">{errorMessage}</div>
                )}

                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Event Name"
                  required
                />
                <br />
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Venue"
                  required
                />
                <br />
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  required
                />
                <br />
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category"
                  required
                />
                <br />

                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Time"
                  required
                />
                <select
                  value={amPm}
                  onChange={(e) => setAmPm(e.target.value)}
                  required
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>

                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  required
                >
                  <option value="EST">EST</option>
                  <option value="CST">CST</option>
                  <option value="MST">MST</option>
                  <option value="PST">PST</option>
                </select>

                <br />
                <label htmlFor="indoor">Indoor</label>
                <input
                  type="radio"
                  name="indoor"
                  value={true}
                  checked={indoor === true}
                  onChange={() => setIndoor(true)}
                  required
                />
                <label htmlFor="outdoor">Outdoor</label>
                <input
                  type="radio"
                  name="indoor"
                  value={false}
                  checked={indoor === false}
                  onChange={() => setIndoor(false)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleModalClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addEvent}
              >
                Create Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
