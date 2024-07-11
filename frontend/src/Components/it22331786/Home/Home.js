import React, { useState } from 'react';
import { Link } from "react-router-dom";
import banner from './banner.jpg';

function Home() {
  // Define state for the search input value
  const [searchValue, setSearchValue] = useState("");

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Function to handle search button click
  const handleSearchClick = () => {
    // Perform search functionality here, e.g., fetch data based on searchValue
    console.log("Searching for:", searchValue);
  };

  return (
    <div>
      <img className='d2233' src={banner} alt=''/>
      <div className="home-container-2233">
        <div className="search-bar-2233">
          <input 
            type="text" 
            className="search-input-2233" 
            placeholder="Search..." 
            value={searchValue} 
            onChange={handleSearchChange} 
          />
          <button 
            type="button" 
            className="search-button-2233" 
            onClick={handleSearchClick}
          >
            Search
          </button>
        </div>

        <div className="buttons-2233">
          <Link to="/eadd" className="home-button-2233 add-employee-button-2233">
            ADD EMPLOYEE DETAILS
          </Link>
          <Link to="/ecreate" className="home-button-2233 edit-employee-button-2233">
            EDIT EMPLOYEE DETAILS
          </Link>
          <Link to="/sadd" className="home-button-2233 calculate-payroll-button-2233">
            CALCULATE PAYROLL
          </Link>
          <button type="button" className="leave-request-button-2233">
            Approve or Reject Leave Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
