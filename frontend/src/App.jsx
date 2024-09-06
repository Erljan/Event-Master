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

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  const [username, setUsername] = useState("");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
              <NavBar />
              <Home />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <NavBar />
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myevents"
            element={
              <ProtectedRoute>
                <NavBar />
                <MyEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events/:id"
            element={
              <ProtectedRoute>
                <NavBar />
                <EventPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <div>
              <NavBar />
              <LoginForm setUsername={setUsername} username={username} />
              </div>
            }
          />
          <Route path="/signup" element={
            <>
              <NavBar />
              <RegisterForm />
            </>
            } />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
