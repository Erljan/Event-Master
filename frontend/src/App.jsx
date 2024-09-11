import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages/Home";
import { LoginForm } from "./pages/Login";
import { RegisterForm } from "./pages/SignUp";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NavBar } from "./components/NavBar";
import { Profile } from "./pages/Profile";
import { MyEvents } from "./pages/MyEvents";
import EventPage from "./pages/EventPage";
import { Sports } from "./pages/Sports";
import { Music } from "./pages/Music";
import { GroupPage } from "./pages/GroupPage";
import ArtsTheatre from "./pages/ArtsTheatre";
import Film from "./pages/Film";
import Misc from "./pages/Misc";
import { add, set } from "lodash";
import EventResults from "./pages/EventResults";
import VenueResults from "./pages/VenueResults";
import Footer from "./components/Footer";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  const [username, setUsername] = useState("");
  const [added, setAdded] = useState(false);

  return (
    <>
      <BrowserRouter>
        <NavBar username={username} setUsername={setUsername} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myevents"
            element={
              <ProtectedRoute>
                <MyEvents setAdded={setAdded} />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <EventPage username={username}/>
              </ProtectedRoute>
            }
          /> */}
          <Route path="/eventresults" element={<EventResults />} />
          <Route path="/venueresults" element={<VenueResults />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/music" element={<Music />} />
          <Route path="/arts" element={<ArtsTheatre />} />
          <Route path="/film" element={<Film />} />
          <Route path="/misc" element={<Misc />} />
          <Route
            path="/event/:id"
            element={
              <EventPage
                added={added}
                setAdded={setAdded}
                username={username}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginForm setUsername={setUsername} />}
          />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
