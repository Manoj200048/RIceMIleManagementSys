import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function Updateproduct() {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    price: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/products/${id}`);
        // Check if the received data has the expected structure
        if (res.data && res.data.product) {
          setInputs(res.data.product);
        } else {
          console.error('Invalid data received from the API:', res.data);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/products/${id}`, {
        title: String(inputs.title),
        description: String(inputs.description),
        price: Number(inputs.price),
      });
      // Display success message using window alert
      window.alert('Product updated successfully');
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    navigate('/');
  };

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" onChange={handleChange} value={inputs.title} required />
        <br />
        <input type="text" name="description" onChange={handleChange} value={inputs.description} required />
        <br />
        <input type="number" name="price" onChange={handleChange} value={inputs.price} required />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Updateproduct;