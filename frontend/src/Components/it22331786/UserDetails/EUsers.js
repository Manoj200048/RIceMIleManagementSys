import React, { useState, useEffect,useRef } from 'react';
import axios from "axios";
import User from "../User/EUser";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import banner from '../UserDetails/logo.jpg';



const URL = "http://localhost:5000/eusers";


const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
}

function EUsers() {
    const [users, setUsers] = useState([]); 
    useEffect(() => {
        fetchHandler().then((data) => setUsers(data.users));
    }, [])

    const ComponentsRef = useRef();
    

    const [searchQuery,setSearchQuery] = useState();
    const [noResults, setNoResults] = useState(false);

    const handleSearch = () =>{
        fetchHandler().then((data)=>{
            const filteredUsers = data.users.filter((user)=>
        Object.values(user).some((field)=>
    field.toString().toLowerCase().includes(searchQuery.toLowerCase())
     ))
     setUsers(filteredUsers);
     setNoResults(filteredUsers.length == 0);
        });
    }

    const generatePDF = async () => {
        const doc = new jsPDF();
    
        // Replace with the correct source path for your logo
        const logoImg = new Image();
        logoImg.src = banner;
    
        try {
            await new Promise((resolve, reject) => {
                logoImg.onload = () => {
                    const imgWidth = 210; // Adjust the width of the logo as needed
                    const imgHeight = 60;
                    doc.addImage(logoImg, 'JPEG', 0, 0, imgWidth, imgHeight);
    
                    const today = new Date();
                    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    doc.setFontSize(10);
                    doc.text("Date: " + date, 10, 70);
    
                    doc.setTextColor("black");
                    doc.setFontSize(20);
                    doc.setFont("bold");
                    doc.text("Employee Details Report", 105, 85, { align: "center" });
    
                    const headers = ['User Name', 'Name', 'NIC','Gender','Email','DOB',' Password','Contact No'];
                    const tableOptions = {
                        startY: 100,
                        head: [headers],
                        styles: {
                            cellPadding: 5,
                            fontSize: 6,
                            valign: 'middle',
                            halign: 'center',
                            textColor: [0, 0, 0],
                            fillColor: [211, 211, 211]
                        },
                    };
    
                    const userData = users.map((user, index) => [
                        user.username,
                        user.name,
                        user.NIC,
                        user.Gender,
                        user.Email,
                        user.DOB,
                        user.password,
                        user.contactno,
                        
                    ]);
                    tableOptions.body = userData;
    
                    doc.autoTable(tableOptions);
    
                    // Resolve the promise when PDF generation is complete
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
             <div className="center-container">
            <input onChange={(e)=>setSearchQuery(e.target.value)}
            type='text'
            name='search'
            className='search'
            placeholder='Search...'></input>

            <button className='searchbtn' onClick={handleSearch}>Search</button>
            </div>

            {noResults ?(
                <div>
                    <p>No Production details found</p>
                </div>
            ):(

            
        <div ref={ComponentsRef}>
            {users && users.map((user, i) => (
                <div key={i}>
                    <User user={user} />
                </div>
            ))}
            </div>
            )}
            <div className="center-container">
            <button className='rbtn' onClick={generatePDF}>Genarate Report</button>
            </div>
        </div>
    )
}

export default EUsers;