import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import NavigationBar from "../NavigationBar/NavigationBar"

const URL = "http://localhost:5000/users";

function Profile({ user }) {
  const { _id, userName, firstName, lastName, bName, bRegName, bOwner, address } = user;
  const navigate = useNavigate();

// Force page reload
const deleteHandler = async () => {
  const userConfirmed = window.confirm("Are you sure you want to delete this account?");
  if (userConfirmed) {
    try {
      await axios.delete(`${URL}/${user._id}`);
      alert("Deleted successfully!");

      
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};


  return (
    <tr className="user-profile-row"> 
      
      <td>{userName}</td>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{bName}</td>
      <td>{bRegName}</td>
      <td>{bOwner}</td>
      <td>{address}</td>
      <td>
        <div className="user-profile-buttons">
          <Link to={`/pro/${_id}`}>
            <button className="update-button">Update</button>
          </Link>
          <button onClick={deleteHandler} className="delete-button">Delete</button>
        </div>
      </td>
    </tr>
  );
}

function UserProfileList({ users, searchQuery, downloadPDF, setSearchQuery }) {
  const filteredUsers = users.filter((user) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
     
      user.firstName.toLowerCase().includes(lowerCaseQuery) || user.bOwner.toLowerCase().includes(lowerCaseQuery) 

     // user.lastName.toLowerCase().includes(lowerCaseQuery) ||
//user.bName.toLowerCase().includes(lowerCaseQuery) ||
     // user.bRegName.toLowerCase().includes(lowerCaseQuery) ||
      // user.userName.toLowerCase().includes(lowerCaseQuery) ||
      //user.address.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div><Header />
    <NavigationBar />
    <br/>
    <div className="user-profile"> {/* Main profile section */}
      
      <div>
        <h1 className="dashboard-title">All Users</h1>
        <div className="add-user">
        <Link to="/ADregi?from=profile">
            <button >Add User</button> {/* 'Add User' button */}
          </Link></div>
          
        <div className="search-and-download"> {/* Flex layout for search and download */}
          
          <input
            className="all-orders-search"
            type="text"
            placeholder="Search by Username, etc."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={downloadPDF} className="pdf-download-button">User Report</button> {/* PDF download button */}
        </div><br/>
        <table className="orders-table"> {/* Applying CSS to the table */}
          <thead>
            <tr>
              
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Business Name</th>
              <th>Business Reg. Number</th>
              <th>Owner</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <Profile key={user._id} user={user} /> 
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

export default function ProfileContainer() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchHandler = async () => {
    const response = await axios.get(URL);
    return response.data;
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.text("User Report", pageWidth / 2, 20, { align: "center" });

    doc.autoTable({
      startY: 30,
      head: [[ "Username", "First Name", "Last Name", "Business Name", "Business Reg. Name", "Owner", "Address"]],
      body: users.map((user) => [
        
        user.userName,
        user.firstName,
        user.lastName,
        user.bName,
        user.bRegName,
        user.bOwner,
        user.address,
      ]),
    });

    doc.save("users_report.pdf");
  };

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  return (
    <UserProfileList
      users={users}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      downloadPDF={downloadPDF}
    />
  );
}