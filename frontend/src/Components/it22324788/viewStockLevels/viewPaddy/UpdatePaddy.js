import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Card from "@mui/joy/Card";
import { CardHeader } from "@mui/material";

function UpdatePaddy() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;
  const [locations, setLocations] = useState([]);

  // Get the variety data for updating
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/paddy/${id}`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setInputs(data.paddy);
        });
        
    };
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/location/names");
        setLocations(response.data.locationNames);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    }; 
    fetchHandler();
    fetchLocations();
  }, [id]);

  const sendRequest = async () => {
    const formattedDate = new Date(inputs.pDate).toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

    await axios
      .put(`http://localhost:5000/paddy/${id}`, {
        weight: Number(inputs.weight),
        mContent: Number(inputs.mContent),
        pDate: formattedDate,
        price: Number(inputs.price),
        location: String(inputs.location),
      })

      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/ViewPaddy"));
  };

  
  return (
    <div>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <Card variant="soft">
          <CardHeader title="Update Paddy" />

          <FormControl
            sx={{ m: 1, width: "25ch" }}
            variant="outlined"
            onSubmit={submitHandler}
          >
            <label>Weight: </label>
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              type="Number"
              name="weight"
              onChange={handleChange}
              value={inputs.weight || ""}
              required
            />
            <label>Moisture content</label>
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              type="Number"
              name="mContent"
              onChange={handleChange}
              value={inputs.mContent || ""}
              required
            />
            <label>Purchase date</label>
            <OutlinedInput
              type="date"
              name="pDate"
              onChange={handleChange}
              value={inputs.pDate || ""}
              required
            />
            <label>Price</label>
            <OutlinedInput
              id="outlined-adornment-price"
              startAdornment={
                <InputAdornment position="start">Rs.</InputAdornment>
              }
              type="Number"
              name="price"
              onChange={handleChange}
              value={inputs.price || ""}
              required
            />
            <label>Location</label>
            <TextField
              name="location"
              onChange={handleChange}
              value={inputs.location || ""}
              required
              id="outlined-select-location"
              select
              label="Select"
              defaultValue="EUR"
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
              Update
            </Button>
          </FormControl>
        </Card>
      </Box>
    </div>
  );
}

export default UpdatePaddy;
