import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import './Update.css';

function SalaryUpdate() {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/saddusers/${id}`);
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

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/saddusers/${id}`, inputs);
      toast('Update succesfuly!')
      
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error updating user. Please try again."); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

   
    setInputs(prevState => ({
        ...prevState,
        [name]: value
    }));

    
    if (name === "bonus") {
        let totalSalary = parseFloat(inputs.basicsalary || 0) + 
                         (parseFloat(inputs.othours || 0) * parseFloat(inputs.AmountOTH || 0)) + 
                         parseFloat(value || 0);

        
        setInputs(prevState => ({
            ...prevState,
            totalsalary: isNaN(totalSalary) ? "" : totalSalary.toFixed(2) 
        }));
    }
};
;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest();
    window.location.assign('/screate');
    toast.success("Successfully Update!");
  };
  return (
    <div className="form-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
            
          <label>basicsalary</label>
          <input type="text"name="basicsalary"value={inputs.basicsalary || ""}onChange={handleChange} required/>
          <br />

          <label>othours</label>
          <input type="text"name="othours"value={inputs.othours || ""}onChange={handleChange} required/>
          <br />

          <label>AmountOTH</label>
          <input type="text"name="AmountOTH"value={inputs.AmountOTH || ""}onChange={handleChange} required/>
          <br />

          <label>bonus</label>
          <input type="text"name="bonus"value={inputs.bonus || ""}onChange={handleChange} required/>
          <br />

          <label>totalsalary</label>
          <input type="text" name="totalsalary" value={inputs.totalsalary} readOnly />
          <br />
 
          <button type="submit">Submit</button>
          
        </form>
      )}
    </div>
  );
}

export default SalaryUpdate;
