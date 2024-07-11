// import React from "react";
// import Head from "../Header/Header";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import { useState, useEffect } from "react";
// import axios from "axios";

// const URL_varieties = "http://localhost:5000/varieties";
// const URL_locations = "http://localhost:5000/location"; // Assuming this is the endpoint for locations data

// const fetchVarieties = async () => {
//   return await axios.get(URL_varieties).then((res) => res.data);
// };

// const fetchLocations = async () => {
//   return await axios.get(URL_locations).then((res) => res.data);
// };

// function ReportPage() {
//   const [varieties, setVariety] = useState();
//   const [locations, setLocations] = useState();

//   useEffect(() => {
//     fetchVarieties().then((data) => setVariety(data.varieties));
//     fetchLocations().then((data) => setLocations(data.location)); // Assuming the key in response is 'location'
//   }, []);

//   const downloadVarietiesPDF = () => {
//     const doc = new jsPDF();
//     doc.autoTable({ html: "#varieties-table" });
//     doc.save("varieties_report.pdf");
//   };

//   const downloadLocationsPDF = () => {
//     const doc = new jsPDF();
//     doc.autoTable({ html: "#locations-table" });
//     doc.save("locations_report.pdf");
//   };
//   return (
//     <div>
//       <Head />
//       <h1>Report Page</h1>
//       <button className="downloadBtn" onClick={downloadVarietiesPDF}>
//         Download Varieties Report PDF
//       </button>
//       <button className="downloadBtn" onClick={downloadLocationsPDF}>
//         Download Locations Report PDF
//       </button>
//       <table id="varieties-table" style={{ display: "none" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Variety Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {varieties &&
//             varieties.map((variety, i) => (
//               <tr key={i}>
//                 <td>{variety._id}</td>
//                 <td>{variety.varietyName}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//       <table id="locations-table" style={{ display: "none" }}>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Capacity</th>
//           </tr>
//         </thead>
//         <tbody>
//           {locations &&
//             locations.map((location, i) => (
//               <tr key={i}>
//                 <td>{location._id}</td>
//                 <td>{location.locationName}</td>
//                 <td>{location.capacity}</td>
//               </tr>
//             ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ReportPage;
import React, { useState, useEffect } from "react";
import Head from "../Header/Header";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";
import { Button } from "@mui/material";


const URL_varieties = "http://localhost:5000/varieties";
const URL_locations = "http://localhost:5000/location";

const fetchVarieties = async () => {
  return await axios.get(URL_varieties).then((res) => res.data);
};

const fetchLocations = async () => {
  return await axios.get(URL_locations).then((res) => res.data);
};

function ReportPage() {
  const [varieties, setVarieties] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchVarieties().then((data) => setVarieties(data.varieties));
    fetchLocations().then((data) => setLocations(data.location));
  }, []);

  const downloadPDF = (type) => {
    const doc = new jsPDF();
    const data = type === "varieties" ? varieties : locations;
    const columns = type === "varieties" ? ["ID", "Variety Name"] : ["ID", "Name", "Capacity"];
    const rows = data.map((item) => {
      return type === "varieties" ? [item._id, item.varietyName] : [item._id, item.locationName, item.capacity];
    });
    doc.autoTable({
      head: [columns],
      body: rows
    });
    doc.save(`${type}_report.pdf`);
  };

  return (
    <div>
      <Head />
      <h1>Report Page</h1>
      <Button variant="contained" onClick={() => downloadPDF("varieties")} sx={{ marginRight: 2 }}>
        Download Varieties Report PDF
      </Button>
      <Button variant="contained" onClick={() => downloadPDF("locations")}>
        Download Locations Report PDF
      </Button>
    </div>
  );
}

export default ReportPage;

