// EmLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEmAuth } from '../contexts/EmAuthContext';

function EmLogin() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();
  const { emLogin } = useEmAuth();
  const URL = "http://localhost:5000/eusers"; // Update with your API URL

  const handleLogin = async () => {
    try {
      const response = await axios.get(`${URL}?username=${username}& password=${ password}`);
      const user = response.data.users[0]; // Assuming there's only one user with provided NIC and Email

      if (user) {
        emLogin(user); // Log in the user
        navigate(`/empro/${user._id}`); // Navigate to employee profile page with user ID
      } else {
        alert('Invalid username or  password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="User name"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={ password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default EmLogin;
