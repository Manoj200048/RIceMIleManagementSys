import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from '../Header/Header';
import ProNav from "../ProNav/ProNav";

function UserProfile() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setUser(response.data.users); 
      } catch (error) {
        setError("Error fetching user data.");
      }
    };

    fetchUser();
  }, [id]); 

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <ProNav />
    <div className="profile-container">
    <div className="header">
      <h2>Customer Details</h2>
      <Link to={`/userupdate/${user._id}`}>
        <button className="update-button1">Update Deatails</button>
      </Link>
    </div>

    <div className="details">
      <div className="detail">
        <strong>ID:</strong> {user._id}
      </div>
      <div className="detail">
        <strong>Username:</strong> {user.userName}
      </div>
      <div className="detail">
        <strong>First Name:</strong> {user.firstName}
      </div>
      <div className="detail">
        <strong>Last Name:</strong> {user.lastName}
      </div>
      <div className="detail">
        <strong>Business Name:</strong> {user.bName}
      </div>
      <div className="detail">
        <strong>Business Registration Number:</strong> {user.bRegName}
      </div>
      <div className="detail">
        <strong>Business Owner:</strong> {user.bOwner}
      </div>
      <div className="detail">
        <strong>Address:</strong> {user.address}
      </div>
    </div>

   
  </div>
  </div>
);
}
export default UserProfile;
