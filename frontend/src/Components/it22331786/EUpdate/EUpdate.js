import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EUpdate() {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/eusers/${id}`);
        setInputs(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again.");
        setIsLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/eusers/${id}`, inputs);
      toast.success("Successfully Updated!");
      window.location.assign('/ecreate');
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error updating user. Please try again.");
    }
  };

  return (
    <div className="form-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>First Name</label>
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={handleChange}
            required
          />
          <br />
          <label>Name</label>
          <input
            type="text"
            name="lastname"
            value={inputs.name || ""}
            onChange={handleChange}
            required
          />
          <br />
          <label>NIC</label>
          <input
            type="text"
            name="NIC"
            value={inputs.NIC || ""}
            onChange={handleChange}
            required
          />
          <br />
          <label>Gender</label>
          <input
            type="text"
            name="Gender"
            value={inputs.Gender || ""}
            onChange={handleChange}
            required
          />
          <br />
          <label>Email</label>
          <input
            type="text"
            name="Email"
            value={inputs.Email || ""}
            onChange={handleChange}
            required
          />
          <br />
          <label>DOB</label>
          <input
            type="text"
            name="DOB"
            value={inputs.DOB || ""}
            onChange={handleChange}
            required
          />
          <br />
          <label>Password</label>
          <input
            type="text"
            name="address"
            value={inputs. password || ""}
            onChange={handleChange}
            required
          />
          <br />
          <label>Contact No</label>
          <input
            type="text"
            name="contactno"
            value={inputs.contactno || ""}
            onChange={handleChange}
            required
          />
          <br />
          {error && <span className="error">{error}</span>}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default EUpdate;
