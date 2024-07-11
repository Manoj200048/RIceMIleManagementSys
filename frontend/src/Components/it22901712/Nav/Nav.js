import React from 'react';

import {Link} from "react-router-dom";

function Nav() {
  return (
    <div>


       <ul className="home-ul">

       <li className="home-li">
       <img src="favicon.ico" alt="alternate-text" width="100" height="100"/>

       </li>

        <li className="home-li">
            <Link to="/mainhome" className="active home-a">
                <h1>Home</h1>
            </Link>
        </li>
       
        
     </ul>

    
    </div>
  )
}

export default Nav
