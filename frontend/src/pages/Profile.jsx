import React, { useEffect } from "react";
import { api } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { UpdateProfileModal } from "../components/UpdateProfileModal";
import AddEventModal from "../components/AddEventModal";
import CreatedEventCard from "../components/CreatedEventCard";
import { ProfileEvents } from "../components/ProfileEvents";

export const Profile = () => {
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  const [newFname, setNewFname] = useState("");
  const [newLname, setNewLname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBio, setNewBio] = useState("");
  const [newZipcode, setNewZipcode] = useState("");

  const [eventsCreated, setEventsCreated] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProfileInfo();
    fetchEventsCreated();
  }, [eventsCreated]);

  const fetchProfileInfo = async () => {
    try {
      const response = await api.get("api/profile/");
      setUsername(response.data.user.username);
      setFname(response.data.user.first_name);
      setLname(response.data.user.last_name);
      setEmail(response.data.user.email);
      setBio(response.data.bio);
      setZipcode(response.data.location);

      localStorage.setItem("zipCode", response.data.location);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      await api.put("api/profile/update/", {
        user: {
          first_name: newFname ? newFname : fname,
          last_name: newLname ? newLname : lname,
          email: newEmail ? newEmail : email,
        },
        bio: newBio ? newBio : bio,
        location: newZipcode ? newZipcode : zipcode,
      });

      if (newZipcode) {
        localStorage.setItem("zipCode", newZipcode);
        setNewZipcode(newZipcode);
      }

      fetchProfileInfo();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEventsCreated = async () => {
    try {
      const response = await api.get("api/events/user-events/");
      setEventsCreated(response.data);
    } catch (error) {
      console.log("Error fetching events created", error);
    }
  };

  const deleteEventBtn = async (id) => {
    try {
      await api.delete(`/api/events/${id}/delete/`);
      fetchEventsCreated();
    } catch (error) {
      console.log("Error deleting event", error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile">
          <p className="profile-info">
            <span>{fname}</span> <span>{lname}</span>
          </p>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
            alt=""
          />
          <h5>@{username}</h5>
          <p className="profile-info">{email}</p>
          <p>{zipcode ? zipcode : "No current zipcode"}</p>
          <button className="button" onClick={() => setIsModalOpen(true)}>
            Update Profile
          </button>
        </div>

        <div className="profile-bio">
          <p className="profile-info">{bio ? bio : "No Bio"}</p>
        </div>

        {isModalOpen && (
          <div className="profile-modal">
            <UpdateProfileModal
              onSubmit={updateProfile}
              onClose={() => setIsModalOpen(false)}
              isOpen={isModalOpen}
              newLname={newLname}
              newFname={newFname}
              newEmail={newEmail}
              zipcode={zipcode}
              newBio={newBio}
              setNewBio={setNewBio}
              setNewEmail={setNewEmail}
              setNewFname={setNewFname}
              setNewLname={setNewLname}
              setNewZipcode={setNewZipcode}
            />
          </div>
        )}
      </div>

      <div className="events-box">
        <h1>Interests</h1>
        <div className="interests">
          <p>Hiking</p>
          <p>Biking</p>
          <p>Classical Music</p>
        </div>
      </div>

      <div className="header2">
        <h1>Your Events</h1>
      </div>
      <AddEventModal />
      <br />
      <div className="events-box">
        <h1>Upcoming Events You've Joined</h1>
        <div className="events">
          <ProfileEvents />
        </div>

        <h1>Events You're Running</h1>
        <div className="events">
          <div className="youre-running">
            {eventsCreated
              ? eventsCreated.map((event, idx) => (
                  <>
                    <CreatedEventCard event={event} />
                  </>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
