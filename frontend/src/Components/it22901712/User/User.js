import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

function User(props) {
    const { user } = props;
    const history = useNavigate(); 

    if (!user) {
        return <div>Loading...</div>; 
    }

    const { _id, production_ID, date, quantity, variety } = user;
    
    const deleteHandler = async () => {
      await axios.delete(`http://localhost:5000/users10/${_id}`)
        .then(res => res.data)
        .then(() => {
          history("/"); // Redirect to home page after deletion
          history("/create"); // Redirect to create page (not sure if this is intended)
        })
        .catch(error => {
          toast.error("Failed to delete user!"); // Notify if deletion fails
          console.error(error); // Log error to console for debugging
        });
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Production ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Variety</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{production_ID}</TableCell>
              <TableCell>{date}</TableCell>
              <TableCell>{quantity}</TableCell>
              <TableCell>{variety}</TableCell>
              <TableCell>
                <Link to={`/create/${_id}`}>
                  <Button variant="contained" color="primary">Update</Button>
                </Link>
                <Button variant="contained" color="secondary" onClick={deleteHandler}>Delete</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default User;
