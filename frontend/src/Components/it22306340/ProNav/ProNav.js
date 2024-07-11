import React from "react";
import { Link } from "react-router-dom";


const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
      <li>
        <Link to={`/userp`}>
        Profile
        </Link>
        </li>
        <li>
        <Link to={`/cusorder`}>
            View Orders
        </Link>
        </li>
        <li>
        <Link to={`/issue`}>
        Report an Issue
        </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;




