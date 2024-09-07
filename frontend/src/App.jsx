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

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  const [username, setUsername] = useState("");

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />
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
                <MyEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <EventPage />
              </ProtectedRoute>
            }
          />
          <Route path="/sports"
          element={
            <Sports />
          }/>
          <Route path="/music"
          element={
            <Music />
          }/>
          <Route path="/event/:id"
          element={
            <EventPage/>
          }/>
          <Route
            path="/login"
            element={
              <LoginForm setUsername={setUsername} username={username} />
            }
          />
          <Route path="/signup" element={
              <RegisterForm />
            } />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
