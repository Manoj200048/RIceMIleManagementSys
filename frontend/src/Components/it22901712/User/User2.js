import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function User2(props) {
    const { user } = props;

    if (!user) {
        return <div>Loading...</div>;
    }

    const { resourse_id, Amount_of_paddy } = user;

    return (
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h6" gutterBottom>User Details</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Resource Id</TableCell>
                            <TableCell>Amount of Paddy (T)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{resourse_id}</TableCell>
                            <TableCell>{Amount_of_paddy}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default User2;
