import React from 'react';
import { Link } from "react-router-dom";
import banner from './banner.jpg';

import { Button, Container, Grid, Typography } from '@mui/material';


import Header from'../Nav/Header';



function Home() {
  return (
    <Container >
      <Header />
      <img src={banner} alt='' style={{ width: '100%', marginTop: "5em" }} />

      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Link to="/create" className="it22901712active home-b">
            <Button variant="contained" color="primary" fullWidth>
              View Production Schedule
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/add" className="it22901712active home-c">
            <Button variant="contained" color="primary" fullWidth>
              Create Production Schedule
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/add1" className="it22901712active home-f">
            <Button variant="contained" color="primary" fullWidth>
              Input Product Details
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/create1" className="it22901712active home-g">
            <Button variant="contained" color="primary" fullWidth>
              View Product Details
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link to="/create2" className="it22901712active home-h">
            <Button variant="contained" color="primary" fullWidth>
              Check Available Resource
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
