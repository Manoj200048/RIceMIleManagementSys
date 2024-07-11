import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import Header from '../Header/Header';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import NavigationBar from "../NavigationBar/NavigationBar"

const IssueList = () => {
  const [issues, setIssues] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get('http://localhost:5000/issues'); 
        setIssues(response.data.issues);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching issues:', err);
        setError('Failed to load issues.'); 
        setLoading(false); 
      }
    };

    fetchIssues();
  }, []); 

  const handleDelete = async (issueId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this issue?");
    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/issues/${issueId}`); 
        setIssues(issues.filter((issue) => issue.issueId !== issueId)); 
      } catch (error) {
        console.error('Error deleting issue:', error); 
      }
    }
  };

  const generateReport = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth(); 

    doc.text("Issue Report", pageWidth / 2, 20, { align: "center" });

    doc.autoTable({
      startY: 30,
      head: [["Issue ID", "Issue Date/Time", "Issue Description"]],
      body: issues.map((issue) => [
        issue.issueId,
        new Date(issue.issueDate).toLocaleString(),
        issue.issueDescription,
      ]),
    });

    doc.save("issue_report.pdf"); // Save the generated PDF
  };

  const filteredIssues = issues.filter(
    (issue) =>
      String(issue.issueId).toLowerCase().includes(searchQuery.toLowerCase()) || 
      new Date(issue.issueDate).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading issues...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div>
      <Header />
      <NavigationBar/><br/>
      <div className="feedback-container"> 
        <h2 className="dashboard-title">Reported Issues</h2>

        <div className="all-orders-header"> 
          
          <input
            type="text"
            placeholder="Search by Issue ID or Date/Time"
            className="all-orders-search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <button onClick={generateReport} className="pdf-download-button">Generate Report</button>
        </div>
        
        {filteredIssues.length === 0 ? (
          <p>No issues found.</p> 
        ) : (
          <table className="feedback-table"> 
            <thead>
              <tr>
                <th>Issue ID</th>
                <th>Issue Date/Time</th>
                <th>Issue Description</th>
                <th>Actions</th> 
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map((issue) => (
                <tr key={issue.issueId}> 
                  <td>{issue.issueId}</td>
                  <td>{new Date(issue.issueDate).toLocaleString()}</td>
                  <td>{issue.issueDescription}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(issue.issueId)}
                      className="delete-feedback-button" 
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default IssueList;
