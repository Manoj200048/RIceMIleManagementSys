import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function User1(props) {
    const { user } = props;
    const history = useNavigate();

    if (!user) {
        return <div>Loading...</div>;
    }

    const { _id, product_ID, bach_NO, poroduct_NAME, manufacture_DATE, expire_DATE, weight, discription } = user;

    const deleteHandler = async () => {
        try {
            await axios.delete(`http://localhost:5000/users1/${_id}`);
            toast.success("Successfully Deleted!");
            history("/");
            history("/create1");
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    }

    return (
        <Paper elevation={3} sx={{ margin: '20px', padding: '20px' }}>
            <Typography variant="h5" gutterBottom>User Details</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product ID</TableCell>
                            <TableCell>Bach NO</TableCell>
                            <TableCell>Product Name</TableCell>
                            <TableCell>Manufacture Date</TableCell>
                            <TableCell>Expire Date</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{product_ID}</TableCell>
                            <TableCell>{bach_NO}</TableCell>
                            <TableCell>{poroduct_NAME}</TableCell>
                            <TableCell>{manufacture_DATE}</TableCell>
                            <TableCell>{expire_DATE}</TableCell>
                            <TableCell>{weight}</TableCell>
                            <TableCell>{discription}</TableCell>
                            <TableCell>
                                <Link to={`/create1/${_id}`}>
                                    <IconButton color="primary" aria-label="edit">
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                <IconButton color="secondary" aria-label="delete" onClick={deleteHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default User1;
