// import React, { useState, useEffect } from "react";
// import ViewStock from "../../buttonGroups/viewStockBtns";
// import Head from "../../Header/Header";
// import axios from "axios";
// import Rice from "./RiceV";
// import { Link } from "react-router-dom";



// const URL = "http://localhost:5000/varieties";

// const fetchHandler = async () => {
//   return await axios.get(URL).then((res) => res.data);
// };

// function RiceVarieties() {
//   const [varieties, setVariety] = useState();
//   useEffect(() => {
//     fetchHandler().then((data) => setVariety(data.varieties));
//   }, []);

  

//   return (
//     <div>
//       <Head/>
//       <ViewStock />
//       <Link to= "/add-rice">
//       <button className="addBtn">Add Rice variety</button>
//       </Link>
//       <h1>Rice Varieties</h1>
//       <table>
//       <tr>
//           <th>ID</th>
//           <th>Variety Name</th>
//           <th>actions</th>
//         </tr>
//       </table>
//       <div>
//         {varieties && varieties.map((variety,i)=>(
//           <div key ={i}>
//             <Rice variety ={variety}/>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RiceVarieties;
import React, { useState, useEffect } from "react";
import ViewStock from "../../buttonGroups/viewStockBtns";
import Head from "../../Header/Header";
import axios from "axios";
import RiceV from "./RiceV"; // Import RiceV component
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const URL = "http://localhost:5000/varieties";

const RiceVarieties = () => {
  const [varieties, setVarieties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        setVarieties(response.data.varieties);
      } catch (error) {
        console.error("Error fetching varieties:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Head />
      <ViewStock />
      <Link to="/add-rice">
        <Button variant="contained" color="primary" style={{width:"13em",height:"2em", fontSize:"15px"}}>Add Rice variety</Button>
      </Link>
      <h1>Rice Varieties</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Variety Name</th>
            <th>Actions</th> {/* Corrected typo */}
          </tr>
        </thead>
        <tbody>
          {varieties.map((variety, i) => (
            <RiceV key={i} variety={variety} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RiceVarieties;
