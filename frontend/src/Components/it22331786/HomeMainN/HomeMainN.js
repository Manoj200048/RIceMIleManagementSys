import React from 'react'; 
import { Link } from "react-router-dom";



function HomeMainN() {
  return (
    <div className="home-main-container">
      <Link to="/emlogin" className="home-button employee-button">
        <button>Employee</button>
      </Link>
      <Link to="/mainHomej" className="home-button hr-manager-button">
        <button>HR Manager</button>
      </Link>
    </div>
  );
}

export default HomeMainN;
