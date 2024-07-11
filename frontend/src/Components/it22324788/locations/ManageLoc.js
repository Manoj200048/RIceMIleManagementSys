import React, { useEffect, useState } from "react";
import Head from "../Header/Header";
import axios from "axios";
import LocationV from "./LocationV";
import { Link } from "react-router-dom";
import LocIMG from "./location-01.jpg";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  Grid,
  Button
} from "@mui/material";

const URL = "http://localhost:5000/location";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ManageLoc() {
  const [location, setLocation] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setLocation(data.location));
  }, []);

  return (
    <div>
      <Head />
      <h1>Manage Location</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <img src={LocIMG} alt="location map" style={{ maxWidth: "70%", height: "auto",marginLeft:"1em" }} />
        </Grid>
      </Grid>
      <br />
      <Link to="/addLocation">
        <Button variant="contained" color="primary" style={{width:"13em",height:"2em", fontSize:"15px",marginLeft:"1em"}} >Add location</Button>
      </Link>
      <TableContainer component={Paper}>
        <Table style={{width:"65%", margin:"auto"}}>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Capacity
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {location &&
              location.map((Location, i) => (
                
                  <LocationV key={i} Location={Location} />
                
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManageLoc;
