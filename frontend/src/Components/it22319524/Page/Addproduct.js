import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Addproduct() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        price: "",
    });

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendRequest();
            window.alert("Product added successfully!");
            history('/');
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/products", {
            title: String(inputs.title),
            description: String(inputs.description),
            price: Number(inputs.price),
        });
    };

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" onChange={handleChange} value={inputs.title} placeholder='Title' required  />
                <br />
                <input type="text" name="description" onChange={handleChange} value={inputs.description} placeholder='Description' required />
                <br />
                <input type="number" name="price" onChange={handleChange} value={inputs.price} placeholder='Price' required />
                <br />
                <button type="submit">Submit</button>
                <br />
            </form>
        </div>
    );
}

export default Addproduct;
