import React from 'react';
import { Link } from "react-router-dom";

function Main() {
  return (
    <div>
       <Link to="/tharaka">
          <button className="NavBtns">Tharaka</button>
        </Link>
        <Link to="/yevin">
          <button className="NavBtns">yevin</button>
        </Link>
        <Link to="/manoj">
          <button className="NavBtns">manoj</button>
        </Link>
        <Link to="/nalinda">
          <button className="NavBtns">nalinda</button>
        </Link>
        <Link to="/chathumin">
          <button className="NavBtns">chathumin</button>
        </Link>
        <Link to="/senuri">
          <button className="NavBtns">senuri</button>
        </Link>
    </div>
  );
}

export default Main;
