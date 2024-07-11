import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, TableCell, TableRow } from "@mui/material";

function LocationV(props) {
  const { _id, locationName, capacity } = props.Location || {};

  const history = useNavigate();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:5000/location/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/manageLocation"));
    alert("Deleted Successfully");
  };
  return (
    <TableRow>
      <TableCell>{_id}</TableCell>
      <TableCell>{locationName}</TableCell>
      <TableCell>{capacity}</TableCell>
      <TableCell>
        <Link to={`/manageLocation/${_id}`}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "80px", height: "40px", margin: "0 10px 0 0" }}
          >
            Update
          </Button>
        </Link>
        <Button
          variant="contained"
          color="error"
          onClick={deleteHandler}
          style={{ width: "80px", height: "40px" }}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default LocationV;
