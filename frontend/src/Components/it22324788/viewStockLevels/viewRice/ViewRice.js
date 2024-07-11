import React, { useEffect, useState } from "react";
import Head from "../../Header/Header";
import ViewStock from "../../buttonGroups/viewStockBtns";
import RiceView from "./RiceV";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const URL = "http://localhost:5000/users1";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ViewRice() {
  const [users, setUser] = useState([]);
  useEffect(() => {
    fetchHandler().then((data) => setUser(data.users));
  }, []);

  return (
    <div>
      <Head />
      <ViewStock />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Product ID
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Batch No.
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Product Name
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Manufacture Date
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Expiry Date
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Weight
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((User, i) => (
              <RiceView key={i} User={User} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewRice;