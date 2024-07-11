import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";
import User from "../User/User";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { TextField, Button, Typography, Paper, Grid } from '@mui/material'; // Importing Material-UI components
import banner from '../UserDetails/logo.jpeg';
import Header from '../Nav/Header'

const URL = "http://localhost:5000/users10";

function Users() {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [noResults, setNoResults] = useState(false);
    const ComponentsRef = useRef();

    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.users));
    }, []);

    const fetchHandler = async () => {
        return await axios.get(URL).then((res) => res.data);
    }

    const handleSearch = () => {
        fetchHandler().then((data) => {
            const filteredUsers = data.users.filter((user) =>
                Object.values(user).some((field) =>
                    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
            setUsers(filteredUsers);
            setNoResults(filteredUsers.length === 0);
        });
    }

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
                    doc.text("Production Schedule Report 2024", 105, 85, { align: "center" });
    
                    const headers = ['Production ID', 'Date', 'Quantity', 'Variety'];
                    const tableOptions = {
                        startY: 100,
                        head: [headers],
                        styles: {
                            cellPadding: 5,
                            fontSize: 12,
                            valign: 'middle',
                            halign: 'center',
                            textColor: [0, 0, 0],
                            fillColor: [211, 211, 211]
                        },
                    };
    
                    const userData = users.map((user, index) => [
                        user.production_ID,
                        user.date,
                        user.quantity,
                        user.variety,
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
    

    return (
        <div>
            <Header/>
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8} md={6}>
                <Paper style={{ padding: '20px' }}>
                    <Typography variant="h5" align="center" gutterBottom>Production Schedule</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        style={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" onClick={handleSearch} fullWidth>Search</Button>
                    {noResults ? (
                        <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>No production details found</Typography>
                    ) : (
                        <div ref={ComponentsRef} style={{ marginTop: '20px' }}>
                            {users.map((user, i) => (
                                <div key={i}>
                                    <User user={user} />
                                </div>
                            ))}
                        </div>
                    )}
                    <Button variant="contained" onClick={generatePDF} fullWidth style={{ marginTop: '20px' }}>Generate Report</Button>
                </Paper>
            </Grid>
        </Grid>
        </div>
    );
}

export default Users;
