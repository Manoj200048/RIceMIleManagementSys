import React from "react";

import logo from "./logo.jpeg";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <img src={logo} alt="Logo" style={{ width: 40, marginRight: 10 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        
        </Typography>
        <Link to="/mainHome" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button color="inherit">Home</Button>
        </Link>
        <Button color="inherit">Profile</Button>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
}


export default Header;
