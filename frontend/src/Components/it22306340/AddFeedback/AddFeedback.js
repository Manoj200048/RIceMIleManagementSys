import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AddFeedback = () => {
  const location = useLocation();
  const initialData = location.state || {}; // Get the state or an empty object



  const [feedbackId, setFeedbackId] = useState(initialData.feedbackId || '');
  const [customerId, setCustomerId] = useState(initialData.customerId || '');
  const [productName, setProductName] = useState(initialData.productName || '');
  const [productId, setProductId] = useState(initialData.productId || '');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    const newFeedback = {
      feedbackId,
      customerId,
      productName,
      productId,
      feedbackMessage, 
    };

    try {
      const response = await axios.post('http://localhost:5000/feedbacks', newFeedback);

      console.log('Feedback added:', response.data);

      // Clear the form fields
      setFeedbackId('');
      setCustomerId('');
      setProductName('');
      setProductId('');
      setFeedbackMessage('');

      alert('Feedback added successfully!');
    } catch (error) {
      console.error('Error adding feedback:', error);
      alert('Failed to add feedback.');
    }
  };

  return (
    <div>
      <h2>Add New Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer ID:</label>
          <input
            type="text"
            value={customerId}
            readOnly 
          />
        </div>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            readOnly 
          />
        </div>
        <div>
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            readOnly 
          />
        </div>
        <div>
          <label>Feedback Message:</label>
          <textarea
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Feedback</button>
      </form>
    </div>
  );
};

export default AddFeedback;
