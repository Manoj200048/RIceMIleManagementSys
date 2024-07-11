import React from "react";
import { Link } from "react-router-dom";

function Reports(){
    return(
        <div>
        <h1>Manage Location</h1>
        <Link to="/addproduct">
          
          <button className="addLocBtn">Add product</button>
        </Link>
        
      </div>
    ) 
 }
 
 export default Reports;