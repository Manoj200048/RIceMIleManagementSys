import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import { Link } from "react-router-dom";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Typography, createTheme, ThemeProvider, Grid, Paper } from '@mui/material';
import { green, purple } from '@mui/material/colors';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Nav/Header';


const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});

function AddUser() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        production_ID: "", 
        date: "",
        quantity: "",
        variety: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = '';
        if (name === 'production_ID') {
            if (!value.startsWith('P') || value.length > 5) {
                error = 'Production ID must start with "P" and have a maximum of 5 characters';
            }
        } else if (name === 'quantity') {
            const quantity = parseInt(value);
            if (quantity > 3000) {
                error = 'Quantity must be less than or equal to 3000';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).some(error => error !== '')) {
            return;
        }
        try {
            await sendRequest();
            toast.success("Successfully Submitted!");
            history('/create');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const sendRequest = async () => {
        const response = await axios.post("http://localhost:5000/users10", {
            production_ID: String(inputs.production_ID),
            date: String(inputs.date),
            quantity: Number(inputs.quantity),
            variety: String(inputs.variety),
        });
        return response.data;
    };

    return (
      <div>
        <Header/>
        <ThemeProvider theme={theme}>
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Paper elevation={3} style={{ padding: '20px' }}>
                        <Typography variant="h4" gutterBottom>Create Schedule</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Production ID"
                                type="text"
                                name="production_ID"
                                onChange={handleChange}
                                value={inputs.production_ID}
                                error={Boolean(errors.production_ID)}
                                helperText={errors.production_ID}
                                required
                                fullWidth
                                margin="normal"
                            />

                            <TextField
                                label="Date"
                                type="date"
                                name="date"
                                onChange={handleChange}
                                value={inputs.date}
                                required
                                fullWidth
                                margin="normal"
                            />

                            <TextField
                                label="Quantity"
                                type="number"
                                name="quantity"
                                onChange={handleChange}
                                value={inputs.quantity}
                                error={Boolean(errors.quantity)}
                                helperText={errors.quantity}
                                required
                                fullWidth
                                margin="normal"
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel id="variety-label">Variety</InputLabel>
                                <Select
                                    labelId="variety-label"
                                    id="variety"
                                    name="variety"
                                    value={inputs.variety}
                                    onChange={handleChange}
                                    required
                                >
                                    <MenuItem value="">Select variety</MenuItem>
                                    <MenuItem value="keeri samba">keeri samba</MenuItem>
                                    <MenuItem value="Sudu kakulu">Sudu kakulu</MenuItem>
                                    <MenuItem value="Ratu kakulu">Ratu kakulu</MenuItem>
                                </Select>
                            </FormControl>

                            <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </ThemeProvider>
        </div>
    );
}

export default AddUser;
