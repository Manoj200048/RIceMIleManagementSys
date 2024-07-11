// import React, { useEffect, useState } from "react";
// import Head from "../../Header/Header";
// import ViewStock from "../../buttonGroups/viewStockBtns";
// import PaddyView from "./PaddyV";
// import axios from "axios";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const URL = "http://localhost:5000/paddy";

// const fetchHandler = async () => {
//   return await axios.get(URL).then((res) => res.data);
// };

// function ViewPaddy() {
//   const [paddy, setPaddy] = useState([]);
//   useEffect(() => {
//     fetchHandler().then((data) => setPaddy(data.paddy));
//   }, []);

  



//   return (
//     <div>
//       <Head />
//       <ViewStock />
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell style={{ color: "white", fontWeight: "bold" }}>
//                 ID
//               </TableCell>
//               <TableCell style={{ color: "white", fontWeight: "bold" }}>
//                 Weight
//               </TableCell>
//               <TableCell style={{ color: "white", fontWeight: "bold" }}>
//                 Moisture content
//               </TableCell>
//               <TableCell style={{ color: "white", fontWeight: "bold" }}>
//                 Purchase date
//               </TableCell>
//               <TableCell style={{ color: "white", fontWeight: "bold" }}>
//                 Price
//               </TableCell>
//               <TableCell style={{ color: "white", fontWeight: "bold" }}>
//                 Location
//               </TableCell>
//               <TableCell style={{ color: "white", fontWeight: "bold" }}>
//                 Actions
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paddy.map((Paddy, i) => (
//               <PaddyView key={i} Paddy={Paddy} />
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

// export default ViewPaddy;

import React, { useEffect, useState } from "react";
import Head from "../../Header/Header";
import ViewStock from "../../buttonGroups/viewStockBtns";
import PaddyView from "./PaddyV";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField // Import TextField for search input
} from "@mui/material";

const URL = "http://localhost:5000/paddy";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function ViewPaddy() {
  const [paddy, setPaddy] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    fetchHandler().then((data) => setPaddy(data.paddy));
  }, []);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtering paddy based on search query
  const filteredPaddy = paddy.filter((Paddy) =>
    Paddy.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Head />
      <ViewStock />
      {/* Search input field */}
      <TextField
        label="Search by Location"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px" }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                ID
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Weight
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Moisture content
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Purchase date
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Price
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Location
              </TableCell>
              <TableCell style={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPaddy.map((Paddy, i) => (
              <PaddyView key={i} Paddy={Paddy} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ViewPaddy;
