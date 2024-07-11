import React from "react";
import logo from "./logo.jpeg";
import { Link } from "react-router-dom";


import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";



function Header() {
  return (
    <div>
      <header>
      <Box sx={{ backgroundColor: '#002432' }}>
            <CssBaseline />
            <AppBar position="static">
              <Toolbar>

                <Link to="/wHome">
                  <Button color="inherit">Home</Button>
                </Link>
                <Button color="inherit">Profile</Button>
                <Button color="inherit">Logout</Button>
                <img
                  src={logo}
                  alt="Logo"
                  id="logo"
                  width={100}
                  style={{ marginRight: "10px" }}
                />
              </Toolbar>
            </AppBar>
          </Box>
      </header>
    </div>
  );
}

export default Header;
