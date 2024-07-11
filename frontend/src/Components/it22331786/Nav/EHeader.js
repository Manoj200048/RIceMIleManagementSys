import React from "react";
import "./header.css";
import logo from "./logo.jpeg";
import { Link } from "react-router-dom";

function EHeader() {
  return (
    <div>
      <header>
        <img className="logo" src={logo} alt="Logo" id="logo" />
        <div className="head">
        <Link to= "/mainHome">
          <h3 className="hNav">Home</h3>
        </Link> 
          <h3 className="hNav">Profile</h3>
          <h3 className="hNav">LogOut</h3>
        </div>
      </header>
    </div>
  );
}

export default EHeader;
