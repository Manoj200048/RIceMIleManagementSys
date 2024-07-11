import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EUser(props) {
    const { user, className } = props;
    const history = useNavigate(); 

    if (!user) {
        return <div>Loading...</div>; 
    }

    const { _id, username, name, NIC, Gender, Email, DOB,  password, contactno } = user;
    
    const deleteHandler = async () => {
      await axios.delete(`http://localhost:5000/eusers/${_id}`)
        .then(res => res.data)
        .then(() => history("/"))
        .then(() => history("/ecreate"))
        toast.success("delete success!")
    }


    return (
      <div className={`user-details-table ${className}`}>
        <table>
          <thead>
            <tr>
              <th>User Name</th>
              <th>Name</th>
              <th>NIC</th>
              <th>Gender</th>
              <th>Email</th>
              <th>DOB</th>
              <th>Password</th>
              <th>Contact No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{username}</td>
              <td>{name}</td>
              <td>{NIC}</td>
              <td>{Gender}</td>
              <td>{Email}</td>
              <td>{DOB}</td>
              <td>{password}</td>
              <td>{contactno}</td>
              <td>
                <Link to={`/ecreate/${_id}`}>
                  <button className="update-button">Update</button>
                </Link>
                <button className="delete-button" onClick={deleteHandler}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

export default EUser;
