// import React from "react";

// import { Link } from "react-router-dom";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function RiceV(props) {
//   const { _id, varietyName } = props.variety || {};

//   const  history = useNavigate();

//   const deleteHandler = async()=>{
//     await axios.delete(`http://localhost:5000/varieties/${_id}`)
//       .then(res=>res.data)
//       .then(() => history("/"))
//       .then(() => history("/riceVarieties"))
//       alert("Deleted Successfully");
//   };
//   return (
//     <div>
//       <table>
//         <tr>
//           <td>{_id}</td>
//           <td>{varietyName}</td>
//           <th>
//             <Link to={`/riceVarieties/${_id}`}>
//               <button className="RiceVBtn">Update</button>
//             </Link>
//             <button className="RiceVBtn" onClick={deleteHandler}>Delete</button>
//           </th>
//         </tr>
//       </table>
//     </div>
//   );
// }

// export default RiceV;
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const RiceV = (props) => {
  const { _id, varietyName } = props.variety || {};
  const history = useNavigate();

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:5000/varieties/${_id}`);
      history("/riceVarieties"); // Redirect to riceVarieties page after deletion
      alert("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting variety:", error);
    }
  };

  return (
    <tr>
      <td>{_id}</td>
      <td>{varietyName}</td>
      <td>
        <Link to={`/riceVarieties/${_id}`}>
          <Button variant="contained" color="primary" style={{width:"80px", height:"40px",margin:"0 10px 0 0"}}>Update</Button>
        </Link>
        <Button variant="contained" color="error" onClick={deleteHandler} style={{width:"80px", height:"40px"}}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default RiceV;


