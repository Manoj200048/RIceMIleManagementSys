import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../Nav/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';

function Update() {
    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users10/${id}`); 
                setInputs(response.data.user);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchHandler();
    }, [id]); 

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/users10/${id}`, { 
                production_ID: String(inputs.production_ID),
                date: String(inputs.date),
                quantity: Number(inputs.quantity),
                variety: String(inputs.variety),
            });
            history('/create');
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history('/create'));
        toast.success("Successfully Updated!");
    };

    return (
        <div>
            <Header/>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom><b>Update</b></Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Production ID"
                                name="production_ID"
                                onChange={handleChange}
                                value={inputs.production_ID || ''}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Date"
                                name="date"
                                onChange={handleChange}
                                value={inputs.date || ''}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Quantity"
                                name="quantity"
                                onChange={handleChange}
                                value={inputs.quantity || ''}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Variety"
                                name="variety"
                                onChange={handleChange}
                                value={inputs.variety || ''}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <Button variant="contained" color="primary" type="submit">Submit</Button>
                        </form>
                        <Link to="/create" className="it22901712active home-d">Go back</Link>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Update;
