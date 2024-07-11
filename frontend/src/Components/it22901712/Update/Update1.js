import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../Nav/Header';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Paper, Typography } from '@mui/material';

function Update1() {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const history = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        const fetchHandler = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/users1/${id}`); 
                setInputs(response.data.user);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchHandler();
    }, [id]); 

    const sendRequest = async () => {
        try {
            await axios.put(`http://localhost:5000/users1/${id}`, { 
                product_ID: inputs.product_ID,
                bach_NO: inputs.bach_NO,
                poroduct_NAME: inputs.poroduct_NAME,
                manufacture_DATE: inputs.manufacture_DATE,
                expire_DATE: inputs.expire_DATE,
                weight: inputs.weight,
                discription: inputs.discription,
            });
            history('/create1');
        } catch (error) {
            console.error("Error sending request:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = '';
        if (name === 'product_ID') {
            if (!value.startsWith('PR') || value.length > 5) {
                error = 'Production ID must start with "PR" and have a maximum of 5 characters';
            }
        } else if (name === 'bach_NO') {
            if (!value.startsWith('B') || value.length > 5) {
                error = 'Batch NO must start with "B" and have a maximum of 5 characters';
            }
        }
        setInputs(prevState => ({
            ...prevState,
            [name]: value,
        }));
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history('/create1'));
        toast.success("Successfully Updated!");
    };

    return (
        <div>
            <Header />
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom><b>Update</b></Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Product ID"
                                name="product_ID"
                                onChange={handleChange}
                                value={inputs.product_ID || ''}
                                fullWidth
                                margin="normal"
                                required
                                error={Boolean(errors.product_ID)}
                                helperText={errors.product_ID}
                            />
                            <TextField
                                label="Batch NO"
                                name="bach_NO"
                                onChange={handleChange}
                                value={inputs.bach_NO || ''}
                                fullWidth
                                margin="normal"
                                required
                                error={Boolean(errors.batch_NO)}
                                helperText={errors.batch_NO}
                            />
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel>Product Name</InputLabel>
                                <Select
                                    name=" poroduct_NAME"
                                    value={inputs. poroduct_NAME || ''}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Select Product Name</MenuItem>
                                    <MenuItem value="Sudu Kakulu">Sudu Kakulu</MenuItem>
                                    <MenuItem value="Ratu Kakulu">Ratu Kakulu</MenuItem>
                                    <MenuItem value="Keeri Samba">Keeri Samba</MenuItem>
                                    <MenuItem value="Nadu">Nadu</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Manufacture Date"
                                type="date"
                                name="manufacture_DATE"
                                onChange={handleChange}
                                value={inputs.manufacture_DATE || ''}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Expire Date"
                                type="date"
                                name="expire_DATE"
                                onChange={handleChange}
                                value={inputs.expire_DATE || ''}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <FormControl fullWidth margin="normal" required>
                                <InputLabel>Weight</InputLabel>
                                <Select
                                    name="weight"
                                    value={inputs.weight || ''}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">Select weight</MenuItem>
                                    <MenuItem value="5kg">5kg</MenuItem>
                                    <MenuItem value="10kg">10kg</MenuItem>
                                    <MenuItem value="20kg">20kg</MenuItem>
                                    <MenuItem value="50kg">50kg</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Description"
                                name="discription"
                                onChange={handleChange}
                                value={inputs.discription || ''}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <Button variant="contained" color="primary" type="submit">Submit</Button>
                        </form>
                        <Link to="/create1" className="active home-d">Go back</Link>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Update1;
