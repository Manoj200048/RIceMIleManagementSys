import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

import Box from "@mui/material/Box";

import Button from "@mui/material/Button";

function AddLocation() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    _id: "",
    locationName: "",
    capacity: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (validateLocationName(inputs.locationName)) {
      sendRequest().then(() => history("/manageLocation"));
    } else {
      alert(
        "Invalid location name. Please enter one of the following: L1, L2, L3, C1, C2, R1, R2, R3"
      );
    }
  };

  const validateLocationName = (locationName) => {
    const validLocationNames = ["L1", "L2", "L3", "C1", "C2", "R1", "R2", "R3"];
    return validLocationNames.includes(locationName);
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/location", {
        _id: inputs._id,
        locationName: String(inputs.locationName),
        capacity: Number(inputs.capacity),
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <center>
        <h1>Add Location</h1>
      </center>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <FormControl
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
          onSubmit={submitHandler}
        >
          <label>ID</label>
          <OutlinedInput
            type="text"
            name="_id"
            onChange={handleChange}
            value={inputs._id}
            required
          />
          <br />
          <br />
          <label>Location name</label>
          <OutlinedInput
            type="text"
            name="locationName"
            onChange={handleChange}
            value={inputs.locationName}
            required
          />
          <br />
          <br />
          <label>Capacity</label>
          <OutlinedInput
            type="Number"
            name="capacity"
            onChange={handleChange}
            value={inputs.capacity}
            required
          />
          <br />
          <Button variant="contained" onClick={submitHandler}>
            Add
          </Button>
        </FormControl>
      </Box>
    </div>
  );
}

export default AddLocation;
