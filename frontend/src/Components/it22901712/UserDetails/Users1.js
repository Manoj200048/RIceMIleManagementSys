import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import User1 from '../User/User1';
import { useReactToPrint } from "react-to-print";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Grid, TextField, Button, Typography, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import Header from '../Nav/Header';
import banner from '../UserDetails/logo.jpeg';

const URL = "http://localhost:5000/users1";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function Users1() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.users));
    }, []);

    const ComponentsRef = useRef();

    const generatePDF = async () => {
        const doc = new jsPDF();

        
        const logoImg = new Image();
        logoImg.src = banner;

        try {
            await new Promise((resolve, reject) => {
                logoImg.onload = () => {
                    const imgWidth = 60; 
                    const imgHeight = 60;
                    doc.addImage(logoImg, 'JPEG', 0, 0, imgWidth, imgHeight);

                    const today = new Date();
                    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    doc.setFontSize(10);
                    doc.text("Date: " + date, 10, 70);

                    doc.setTextColor("black");
                    doc.setFontSize(20);
                    doc.setFont("bold");
                    doc.text("Product Details Report", 105, 85, { align: "center" });

                    const headers = ['Product ID', 'Bach NO', 'Product Name', 'Manufacture Date', 'Expire Date', 'Weight', 'Description'];
                    const tableOptions = {
                        startY: 100,
                        head: [headers],
                        styles: {
                            cellPadding: 5,
                            fontSize: 10,
                            valign: 'middle',
                            halign: 'center',
                            textColor: [0, 0, 0],
                            fillColor: [211, 211, 211]
                        },
                    };

                    const userData = users.map((user) => [
                        user.product_ID,
                        user.bach_NO,
                        user.poroduct_NAME,
                        user.manufacture_DATE,
                        user.expire_DATE,
                        user.weight,
                        user.discription,
                    ]);
                    tableOptions.body = userData;

                    doc.autoTable(tableOptions);

                    
                    resolve();
                };
                logoImg.onerror = reject;
            });
            doc.save("product_report.pdf");
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredUsers = data.users.filter((user) =>
                Object.values(user).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                ));
            setUsers(filteredUsers);
            setNoResults(filteredUsers.length === 0);
        });
    };

    return (
        <div>
            <Header/>
        <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
            <Typography variant="h5" gutterBottom>User Details</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={8}>
                    <TextField
                        fullWidth
                        label="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                    />
                </Grid>
                <Grid item xs={4} align="right">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<DownloadIcon />}
                        onClick={generatePDF}
                    >
                        Generate Report
                    </Button>
                </Grid>
            </Grid>
            {noResults ? (
                <Typography variant="body1">No Production details found</Typography>
            ) : (
                <div ref={ComponentsRef}>
                    {users.map((user, i) => (
                        <div key={i}>
                            <User1 user={user} />
                        </div>
                    ))}
                </div>
            )}
        </Paper>
        </div>
    );
}

export default Users1;
