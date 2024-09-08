import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/index.css"
import { useState, useEffect } from "react";
import { api } from "../api";
import logo from '../images/logo.png';
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";



export function NavBar({username, setUsername}) {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);

    // Clear the username
    setUsername("");

    // Redirect to login page
    navigate("/login");
  };


  return (
    <Navbar expand="lg" className="navbar" data-bs-theme="dark">
      <Container className='navbar-container'>
          <Navbar.Brand className="titletext" as={Link} to="/"><img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }}/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
       <div className='nav-options'>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/sports">Sports</Nav.Link>
            <Nav.Link as={Link} to="/music">Music</Nav.Link>

       </div>

       <div className='navbar-dropdown'> 
            {
              username ? 
              <NavDropdown title={`@${username}`} id="basic-nav-dropdown" className='navbar-dropdown'>
              <NavDropdown.Item as={Link} to="/myevents">My events</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              
            </NavDropdown> :
            <Nav.Link as={Link} to="/login">Login/Register</Nav.Link>

}
        </div>
          </Nav>
        </Navbar.Collapse>
      </Container>      
    </Navbar>
  );
}