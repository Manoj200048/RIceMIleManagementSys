import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

import Header from '../Header/Header';
import ProNav from "../ProNav/ProNav";


const IssueReporting = () => {
  const [issueDescription, setIssueDescription] = useState(''); 
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate(); 

 
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const newIssue = {
        issueDescription, 
      };

     
      await axios.post('http://localhost:5000/issues', newIssue);

      
      setIssueDescription(''); 
      setMessage('Issue reported successfully!'); 

      // Navigate to /userp
      setTimeout(() => navigate('/userp'), 1500); 
    } catch (error) {
      console.error('Error reporting issue:', error);
      setMessage('Failed to report issue.'); 
    }
  };

  return (
    <div>
      <Header />
      <ProNav />

<div className="issue-reporting-container"> 
      <h2 className="issue-reporting-title">Report an Issue</h2> 
      {message && <p className="message">{message}</p>} 
      <form onSubmit={handleSubmit} className="issue-reporting-form"> 
        <div className="form-group"> 
          <label className="form-label">Issue Description:</label>
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            required
            className="form-textarea" 
          />
        </div>
        <div className="form-button-container"> 
    <button type="submit">Submit Issue</button>
  </div>
      </form>
    </div>
    </div>
  );
};
export default IssueReporting;
