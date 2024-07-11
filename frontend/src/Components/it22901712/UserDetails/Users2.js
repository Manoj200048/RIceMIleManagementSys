import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import User2 from "../User/User2";
import { useReactToPrint } from "react-to-print";
import Header from '../Nav/Header';

import { TextField, Button, Typography, Paper, Grid } from "@mui/material";

const URL = "http://localhost:5000/users2";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users2() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  const ComponentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Production Report",
    onAfterPrint: () => alert("Production report Successfully Download !..."),
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

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
  };

  const [newPaddy, setNewPaddy] = useState("");
  const handlePaddyChange = (e) => {
    setNewPaddy(e.target.value);
  };

  const handlePaddySubmit = () => {

    const updatedUsers = users.map((user) => {
      if (user.resourse_id === selectedUserId) {
        return {
          ...user,
          Amount_of_paddy: user.Amount_of_paddy - newPaddy,
        };
      }
      return user;
    });
    setUsers(updatedUsers);
    setNewPaddy("");
  };

  const [selectedUserId, setSelectedUserId] = useState("");

  return (
    <div>
      <Header/>
    <Paper elevation={3} style={{ padding: '20px', margin: '20px' }}>
      <Typography variant="h5" gutterBottom>Paddy Details</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={8}>
          <TextField
            fullWidth
            className="ITit22901712search2"
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            placeholder="Search..."
          />
        </Grid>
        <Grid item xs={4} align="right">
          <Button
            variant="contained"
            className="ITit22901712button"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {noResults ? (
        <Typography variant="body1">No Production details found</Typography>
      ) : (
        <div ref={ComponentsRef}>
          {users.map((user, i) => (
            <div key={i}>
              <User2 user={user} />
              <Button
                variant="contained"
                onClick={() => setSelectedUserId(user.resourse_id)}
              >
                Get Paddy
              </Button>
            </div>
          ))}
        </div>
      )}

      {selectedUserId && (
        <div>
          <TextField
            className="It22901712I"
            type="number"
            value={newPaddy}
            onChange={handlePaddyChange}
            placeholder="Enter new paddy quantity"
          />
          <Button variant="contained" onClick={handlePaddySubmit}>
            Submit
          </Button>
        </div>
      )}
    </Paper>
    </div>
  );
}

export default Users2;
