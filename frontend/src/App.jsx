import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useState } from "react"
import { Home } from "./pages/Home"
import { LoginForm } from "./pages/LoginForm"
import { RegisterForm } from "./pages/RegisterForm"
import { ProtectedRoute } from "./components/ProtectedRoute"


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
              <Home />
            </ProtectedRoute>
          }/>
          <Route path="/login" element={ <LoginForm setUsername={setUsername} username={username}/>} />
          <Route path="/signup" element={ <RegisterForm/>} />
          <Route path="/logout" element={ <Logout/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
