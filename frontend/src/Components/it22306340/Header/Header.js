import React from "react";

import logo from "./logo.jpeg";
import { Link } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';


function Header() {


  return (
    <div>
      <header>
        <img src={logo} alt="Logo" id="logo" />
        <div className="head">
        <Link to= "/home">
          <h3 className="hNav" >Home</h3>
        </Link> 
        <Link to={`/userp`}><h3 className="hNav">Profile</h3></Link> 
          <h3 className="hNav">LogOut</h3>
        </div>
      </header>
    </div>
  );
}

export default Header;
