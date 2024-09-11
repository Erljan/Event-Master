import React from "react";
import "../styles/Footer.css";
import logo from "../images/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="text">Created by Mickey, Erljan, and Garrett</p>
      <img
        className="logo"
        src={logo}
        alt="logo"
        style={{ width: "200px", height: "auto" }}
      />
    </footer>
  );
}
