import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import "../styles/index.css"
import { useState, useEffect } from "react";
import { api } from "../api";


export function NavBar() {
  const [username, setUsername] = useState("")

  useEffect(() => {
    const fetchUsername = async() => {

      const response = await api.get("api/profile/")
        setUsername(response.data.user.username)
      
    }

    fetchUsername()
  }, [])

  return (
    <Navbar expand="lg" className="navbar" data-bs-theme="dark">
      <Container>
          <Navbar.Brand className="titletext" as={Link} to="/">Event Master</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/myevents">My events</Nav.Link>

            {
              username ? 
            <NavDropdown title={`@${username}`} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
              
            </NavDropdown> :
            <NavDropdown title={`Guest`} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/signup">Register</NavDropdown.Item>
              
            </NavDropdown>

            }
          </Nav>
        </Navbar.Collapse>
      </Container>      
    </Navbar>
  );
}