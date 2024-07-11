import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';  
import UserProfile from '../UserProfile/UserProfile';
import { Link } from "react-router-dom";

import Header from '../Header/Header';

const URL = "http://localhost:5000/users"; 

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${URL}?userName=${username}`);
      const user = response.data.users.find((user) => user.password === password);

      if (user) {
        login(user); 
        navigate(`/userp/${user._id}`, { state: { user } }); 
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <Header /><br></br>
    <div className="login-container">
    <h2>Login</h2>
    <Link to="/home">
      Admin
    </Link>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    
    <button onClick={handleLogin} className="login-button1">Login</button>
    <h3>Don't have an Account...?</h3>
    <Link to="/CSregi?from=log">
      <button className="login-button2">Register Here</button> 
    </Link>
    
  </div>

  </div>
);
}


export default Login;
