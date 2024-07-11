import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from "axios";

import Header from '../Header/Header';
import NavigationBar from "../NavigationBar/NavigationBar"
import { useParams, useSearchParams } from 'react-router-dom';


function CusRegister() {
  const history = useNavigate();

  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const from = searchParams.get('from'); 

  const [inputs, setInputs] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
    bName: "",
    bRegName: "",
    bOwner: "",
    address: ""
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("Register Succesfully")
    {/*if (from === 'profile') {*/}
      history('/pro');
  {/*} else if (from === 'log') {
      history('/login');
    }*/}
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/users", {
      userName: String(inputs.userName),
      password: String(inputs.password),
      firstName: String(inputs.firstName),
      lastName: String(inputs.lastName),
      bName: String(inputs.bName),
      bRegName: String(inputs.bRegName),
      bOwner: String(inputs.bOwner),
      address: String(inputs.address),
    }).then(res => res.data);
  };

  return (
    <div>
    <Header />
    <NavigationBar/>
    <br/><br/>
    <div className="customer-registration-container"> 
    
    <h1>Join Us: Register for Exclusive Access!</h1>

    <div className="customer-registration-form">
      <h2>Customer Registration Form</h2> 
      <form onSubmit={handleSubmit}>
        <div className="form-row"> 
          <div className="form-column"> 
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

          <div className="form-column"> 
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
export default CusRegister;
