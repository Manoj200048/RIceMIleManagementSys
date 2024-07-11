import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

import Header from '../Header/Header';

function CusUpdate() {
  const [inputs, setInputs] = useState({
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    bName: '',
    bRegName: '',
    bOwner: '',
    address: ''
  });

  const [error, setError] = useState(null);
  const history = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const from = searchParams.get('from'); // Get the 'from' query parameter

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        const userData = response.data.users;

        setInputs({
          userName: userData.userName || '',
          password: userData.password || '',
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          bName: userData.bName || '',
          bRegName: userData.bRegName || '',
          bOwner: userData.bOwner || '',
          address: userData.address || ''
        });
      } catch (error) {
        setError("Error fetching user data. User might not exist.");
      }
    };

    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        userName: String(inputs.userName),
        password: String(inputs.password),
        firstName: String(inputs.firstName),
        lastName: String(inputs.lastName),
        bName: String(inputs.bName),
        bRegName: String(inputs.bRegName),
        bOwner: String(inputs.bOwner),
        address: String(inputs.address)
      });
    } catch (error) {
      setError("Error updating user data.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    // Alert about successful update
    window.alert("Updated Successfully!");
  
    // Navigate to the user profile page
    history(`/userp/${id}`);
  };
  
  return (
    <div>
      <Header /><br/><br/>
    <div className="customer-registration-container"> {/* Use the same container class for styling */}
    
    <h1>Update User Information</h1>

    <div className="customer-registration-form">

      {error && <p className="error-message">{error}</p>} {/* Display error message if there's an error */}

      <form onSubmit={handleSubmit}>
        <div className="form-row"> {/* Two-column layout */}
          <div className="form-column"> {/* Left column */}
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              onChange={handleChange}
              value={inputs.userName}
              required
            />

            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              value={inputs.firstName}
              required
            />

            <label htmlFor="bName">Business Name:</label>
            <input
              type="text"
              id="bName"
              name="bName"
              onChange={handleChange}
              value={inputs.bName}
              required
            />

            <label htmlFor="bOwner">Business Owner:</label>
            <input
              type="text"
              id="bOwner"
              name="bOwner"
              onChange={handleChange}
              value={inputs.bOwner}
              required
            />
          </div>

          <div className="form-column"> {/* Right column */}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              value={inputs.password}
              required
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              value={inputs.lastName}
              required
            />

            <label htmlFor="bRegName">Business Registration Number:</label>
            <input
              type="text"
              id="bRegName"
              name="bRegName"
              onChange={handleChange}
              value={inputs.bRegName}
              required
            />

           
            
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            onChange={handleChange}
            value={inputs.address}
            required
          ></textarea>
        
          </div>
        </div>

        

        <div className="submit-button">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  </div>
  </div>
);
}
export default CusUpdate;
