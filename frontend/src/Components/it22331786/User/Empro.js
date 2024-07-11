import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEmAuth } from '../contexts/EmAuthContext';

function Empro() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { loggedInUser } = useEmAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/eusers/${id}`);
        setUser(response.data.users); 
      } catch (error) {
        setError("Error fetching user data.");
      }
    };

    fetchUser();
  }, [id, setUser]); 

  if (!loggedInUser) {
    return <div>Please log in to view this page.</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  const { _id, firstname, lastname, NIC, Gender, Email, DOB, address, contactno } = user;

  return (
    <div className="user-details-table">
      <h2>Employee Details</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>NIC</th>
            <th>Gender</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{_id}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{NIC}</td>
            <td>{Gender}</td>
            <td>{Email}</td>
            <td>{DOB}</td>
            <td>{address}</td>
            <td>{contactno}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Empro;
