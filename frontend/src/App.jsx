import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import { Home } from "./pages/Home"
import { LoginForm } from "./pages/LoginForm"
import { RegisterForm } from "./pages/RegisterForm"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { NavBar } from "./components/NavBar"
import { Profile } from "./pages/Profile"
import { MyEvents } from "./pages/MyEvents"


function Logout(){
  localStorage.clear()
  return <Navigate to="/login"/>
}

function App() {
  const [username, setUsername] = useState("")

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <NavBar/>
              <Home />
            </ProtectedRoute>
          }/>
          <Route path="/profile" element={
            <ProtectedRoute>
              <NavBar/>
              <Profile />
            </ProtectedRoute>
          }/>
          <Route path="/myevents" element={
            <ProtectedRoute>
              <NavBar/>
              <MyEvents />
            </ProtectedRoute>
          }/>
          <Route path="/login" element={ <LoginForm setUsername={setUsername} username={username}/>} />
          <Route path="/register" element={ <RegisterForm/>} />
          <Route path="/logout" element={ <Logout/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
