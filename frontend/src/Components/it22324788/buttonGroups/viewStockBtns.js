import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link } from "react-router-dom";

function ViewStock() {
  return (
    <div>
      <h2>VIEW STOCK LEVELS</h2>
      <ButtonGroup variant="contained" aria-label="Basic button group" style={{padding:"20px 0", boxShadow:"none"}}>
        <Button
          variant="contained"
          component={Link}
          to="/viewPaddy"
          className="vsBTNS"
        >
          Paddy
        </Button>

        <Button
          variant="contained"
          component={Link}
          to="/viewRice"
          className="vsBTNS"
        >
          Products
        </Button>

        <Button
          variant="contained"
          component={Link}
          to="/ricevarieties"
          className="vsBTNS"
        >
          Varieties
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ViewStock;
