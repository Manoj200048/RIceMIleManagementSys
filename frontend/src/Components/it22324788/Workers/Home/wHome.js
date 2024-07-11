import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function WHome() {
  return (
    <div>
      <Header />
      <Grid container spacing={40} justifyContent="center" style={{ padding: "100px 0" }}>
        <Grid item>
          <Button variant="contained" component={Link} to="/addPaddy" sx={{ width: "200px" }}>
            Add Paddy
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" component={Link} to="/wdamages" sx={{ width: "200px" }}>
            Damages
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" component={Link} to="/wInstructions" sx={{ width: "200px" }}>
            Instructions
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default WHome;
