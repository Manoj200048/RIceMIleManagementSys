import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../Nav/Header';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, Grid, Paper, Typography } from '@mui/material';

function AddUser1() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    
    product_ID: '',
    bach_NO: '',
    poroduct_NAME: '',
    manufacture_DATE: '',
    expire_DATE: '',
    weight: '',
    discription: '',
  });
  const [errors, setErrors] = useState({});

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
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error !== '')) {
      return;
    }
    try {
      await sendRequest();
      toast.success('Successfully Submitted!');
      history('/create1');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

   

  const sendRequest = async () => {
    try {
      const response = await axios.post('http://localhost:5000/users1', {
        product_ID: inputs.product_ID,
        bach_NO: inputs. bach_NO,
        poroduct_NAME: inputs. poroduct_NAME,
        manufacture_DATE: inputs.manufacture_DATE,
        expire_DATE: inputs.expire_DATE,
        weight: inputs.weight,
        discription: inputs.discription,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending request:', error);
      throw error;
    }
  };

  return (
    <div>
    
      <Header />
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Product Details</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                label="product_ID"
                name="product_ID"
                onChange={handleChange}
                value={inputs.product_ID}
                error={Boolean(errors.product_ID)}
                helperText={errors.product_ID}
                required
                fullWidth
                margin="normal"
              />

              <TextField
                label="bach_NO"
                name="bach_NO"
                onChange={handleChange}
                value={inputs.bach_NO}
                error={Boolean(errors.bach_NO)}
                helperText={errors.bach_NO}
                required
                fullWidth
                margin="normal"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="product-name-label">Product Name</InputLabel>
                <Select
                  labelId="product-name-label"
                  id="poroduct_NAME"
                  name="poroduct_NAME"
                  value={inputs.poroduct_NAME}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="">Select Product Name</MenuItem>
                  <MenuItem value="Sudu Kakulu">Sudu Kakulu</MenuItem>
                  <MenuItem value="Ratu Kakulu">Ratu Kakulu</MenuItem>
                  <MenuItem value="Keeri Samba">Keeri Samba</MenuItem>
                  <MenuItem value="Nadu">Nadu</MenuItem>
                </Select>
                {errors.poroduct_NAME && (
                  <FormHelperText error>{errors.poroduct_NAME}</FormHelperText>
                )}
              </FormControl>

              <TextField
                label="Manufacture Date"
                type="date"
                name="manufacture_DATE"
                onChange={handleChange}
                value={inputs.manufacture_DATE}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Expire Date"
                type="date"
                name="expire_DATE"
                onChange={handleChange}
                value={inputs.expire_DATE}
                required
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="weight-label">Weight</InputLabel>
                <Select
                  labelId="weight-label"
                  id="weight"
                  name="weight"
                  value={inputs.weight}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="">Select weight</MenuItem>
                  <MenuItem value="5kg">5kg</MenuItem>
                  <MenuItem value="10kg">10kg</MenuItem>
                  <MenuItem value="20kg">20kg</MenuItem>
                  <MenuItem value="50kg">50kg</MenuItem>
                </Select>
                {errors.weight && (
                  <FormHelperText error>{errors.weight}</FormHelperText>
                )}
              </FormControl>

              <TextField
                label="Description"
                name="discription"
                onChange={handleChange}
                value={inputs.discription}
                required
                fullWidth
                margin="normal"
              />

              <Button variant="contained" color="primary" type="submit" fullWidth>Submit</Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddUser1;
