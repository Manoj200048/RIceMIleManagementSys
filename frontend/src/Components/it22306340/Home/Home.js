import React from 'react'
import { Link } from "react-router-dom";
import Header from '../Header/Header';



function Home() {
  return (
    <div> 
      <Header /> 
      
      <div>
      <h1 className="dashboard-title">CRM Dashboard</h1> 
      <h3 className="dashboard-subtitle">Welcome Customer Management Dashboard...!</h3>
    </div>
      <div className="box-container">
      <div className="admin-buttons"> 
        <Link to="/pro">
          <button>Manage Users</button>
        </Link>
        
        <Link to="/or">
          <button>Veiw User Orders</button>
        </Link>
        <Link to="/feed">
          <button>Veiw Feedbacks</button>
        </Link>

         <Link to="/issue-list">
          <button>Veiw Reported Issues</button>
         </Link>




        </div>
      </div>
    </div>
  );
};
     {/*<Link to="/new" className="active home-a">
        <button>new</button>
  </Link>*/} 
export default Home
