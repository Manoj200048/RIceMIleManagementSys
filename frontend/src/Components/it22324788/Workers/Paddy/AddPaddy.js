
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Head from "../Header/Header";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Card from "@mui/joy/Card";

function AddPaddy() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    weight: "",
    mContent: "",
    pDate: "",
    price: "",
    location: "",
  });

  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/location/names");
      setLocations(response.data.locationNames);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Check if moisture content is within the range 0 - 14
    const mContent = parseFloat(inputs.mContent);
    if (isNaN(mContent) || mContent < 0 || mContent > 14) {
      alert("Moisture content must be a number between 0 and 14.");
      return; // Stop further execution
    }

    console.log(inputs);
    sendRequest().then(() => history("/wHome"));
    alert("Paddy added successfully");
  };

  const sendRequest = async () => {
    const formattedDate = new Date(inputs.pDate).toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
  
    await axios.post("http://localhost:5000/paddy", {
      weight: Number(inputs.weight),
      mContent: Number(inputs.mContent),
      pDate: formattedDate,
      price: Number(inputs.price),
      location: String(inputs.location),
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error("Error adding paddy:", error);
      throw error; // Rethrow the error to handle it in the component
    });
  };
  

  
  return (
    <div>
      <Head />
      <center>
        <h1>Add Paddy</h1>
      </center>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Card variant="soft">
          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            onSubmit={submitHandler}
          >
            <label>Weight (kg)</label>
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              type="Number"
              name="weight"
              onChange={handleChange}
              value={inputs.weight}
              required
            />
            <br />

            <label>Moisture content (percentage)</label>
            <OutlinedInput
              id="outlined-adornment-mContent"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              type="Number"
              name="mContent"
              onChange={handleChange}
              value={inputs.mContent}
              required
            />
            <br />

            <label>Purchase date</label>
            <OutlinedInput
              type="date"
              name="pDate"
              onChange={handleChange}
              value={inputs.pDate}
              required
            />
            <br />
            <label>Price</label>
            <OutlinedInput
              id="outlined-adornment-price"
              startAdornment={
                <InputAdornment position="start">Rs.</InputAdornment>
              }
              type="Number"
              name="price"
              onChange={handleChange}
              value={inputs.price}
              required
            />
            <br />
            <label>Location</label>
            <TextField
              name="location"
              onChange={handleChange}
              value={inputs.location}
              required
              select
              label="Select"
              helperText="Please select warehouse location"
            >
              {locations.map((location, index) => (
                <MenuItem key={index} value={location}>
                  {location}
                </MenuItem>
              ))}
            </TextField>

            <br />

            <Button variant="contained" onClick={submitHandler}>
              Add
            </Button>
          </FormControl>
        </Card>
      </Box>
    </div>
  );
}

export default AddPaddy;
