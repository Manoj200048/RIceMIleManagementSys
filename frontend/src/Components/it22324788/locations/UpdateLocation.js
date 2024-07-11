import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Card from "@mui/joy/Card";
import { CardHeader } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";

function UpdateLocation() {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();
  const id = useParams().id;

  // Get the location data for updating
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/location/${id}`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setInputs(data.location);
          setIsLoading(false);
        });
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/location/${id}`, {
        locationName: String(inputs.locationName),
        capacity: Number(inputs.capacity),
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
    sendRequest().then(() => history("/manageLocation"));
  };

  return (
    <div>
      {isLoading ? ( // Render a loading message if data is still being fetched
        <p>Loading...</p>
      ) : (
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          <Card variant="soft">
            <CardHeader title="Update Location" />
            <FormControl
              sx={{ m: 1, width: "25ch" }}
              variant="outlined"
              onSubmit={submitHandler}
            >
              <label>Location name</label>
              <OutlinedInput
                type="text"
                name="locationName"
                onChange={handleChange}
                value={inputs.locationName || ""}
                required
              />
              <br />

              <label>Capacity</label>
              <OutlinedInput
                type="text"
                name="capacity"
                onChange={handleChange}
                value={inputs.capacity || ""}
                required
              />
              <br/>
              <Button variant="contained" onClick={submitHandler}>
                Update
              </Button>
            </FormControl>
          </Card>
        </Box>
      )}
    </div>
  );
}

export default UpdateLocation;
