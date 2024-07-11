// src/FeedbackList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../Header/Header';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NavigationBar from "../NavigationBar/NavigationBar"

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feedbacks'); 
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (feedbackId) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this FeedBack?");
    if (userConfirmed) {
    try {
      await axios.delete(`http://localhost:5000/feedbacks/${feedbackId}`);
      alert("Deleted successfully!");
      window.location.reload();
      setFeedbacks(feedbacks.filter((fb) => fb._id !== feedbackId));
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.text("Feedback Report", pageWidth / 2, 20, { align: "center" });

    doc.autoTable({
      startY: 30,
      head: [["Customer ID", "Product Name", "Feedback Message", "Date/Time"]],
      body: feedbacks.map((feedback) => [
        feedback.customerId,
        feedback.productName,
        feedback.feedbackMessage,
        new Date(feedback.dateTime).toLocaleString(),
      ]),
    });

    doc.save("feedback_report.pdf"); // Save as PDF
  };

  const filteredFeedbacks = feedbacks.filter(
    (fb) =>
      fb.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fb.feedbackMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <p>Loading feedbacks...</p>;
  }

  return (
    <div>
      <Header />
      <NavigationBar/>
      <br/>
    <div className="feedback-container">
      <h1 className="dashboard-title">Feedback List</h1>

      <div className="all-orders-header">
        <input
        className="all-orders-search"
          type="text"
          placeholder="Search by Customer ID, Product Name, or Feedback Message"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={downloadPDF} className="pdf-download-button">Download Report</button>
      </div>

      {filteredFeedbacks.length === 0 ? (
        <p>No feedbacks found.</p>
      ) : (
        <table className="feedback-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Product Name</th>
              <th>Feedback Message</th>
              <th>Date/Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.customerId}</td>
                <td>{feedback.productName}</td>
                <td>{feedback.feedbackMessage}</td>
                <td>{new Date(feedback.dateTime).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => handleDelete(feedback._id)}
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

export default FeedbackList;
