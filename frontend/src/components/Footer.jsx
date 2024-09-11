import React from "react";
import "../styles/Footer.css";
import { FaGithub } from "react-icons/fa";
import logo from "../images/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="text">
        Created by Mickey Gardner, Erljan Rodrigo, and Garrett Gilbert.
      </p>
      <a
        className="github-link"
        target="_blank"
        href="https://github.com/mickeygard"
      >
        <FaGithub className="gh-logo" />
        mickeygard
      </a>{" "}
      <a
        className="github-link"
        target="_blank"
        href="https://github.com/Erljan"
      >
        <FaGithub className="gh-logo" />
        Erljan
      </a>{" "}
      <a
        className="github-link"
        target="_blank"
        href="https://github.com/garrettgt"
      >
        <FaGithub className="gh-logo" />
        garrettgt
      </a>
      <br></br>
      <br></br>
      <img
        className="logo"
        src={logo}
        alt="logo"
        style={{ width: "200px", height: "auto" }}
      />
    </footer>
  );
}
