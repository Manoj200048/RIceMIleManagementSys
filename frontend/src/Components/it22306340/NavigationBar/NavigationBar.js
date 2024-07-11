import React from "react";
import { Link } from "react-router-dom";
 // Import the CSS file

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li>
          <Link to="/pro">Manage Users</Link>
        </li>
        <li>
          <Link to="/or">View User Orders</Link>
        </li>
        <li>
          <Link to="/feed">View Feedbacks</Link>
        </li>
        <li>
          <Link to="/issue-list">Reported Issues</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;