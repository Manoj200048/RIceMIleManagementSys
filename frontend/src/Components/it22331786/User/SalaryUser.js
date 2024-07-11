import React from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function SalaryUser(props) {
    const { user, className } = props;
    const history = useNavigate();

    if (!user) {
        return <div>Loading...</div>;
    }

    const { _id, basicsalary, othours, AmountOTH, bonus, totalsalary } = user;

    const deleteHandler = async () => {
        await axios.delete(`http://localhost:5000/saddusers/${_id}`)
            .then(res => res.data)
            .then(() => history("/"))
            .then(() => history("/screate"))
        toast.success("Successfully Deleted!")
    }

    return (
        <div className={`user-details-table ${className}`}>
            <table>
                <thead>
                    <tr>
                        
                        <th>basicsalary</th>
                        <th>othours</th>
                        <th>AmountOTH</th>
                        <th>bonus</th>
                        <th>totalsalary</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        
                        <td>{basicsalary}</td>
                        <td>{othours}</td>
                        <td>{AmountOTH}</td>
                        <td>{bonus}</td>
                        <td>{totalsalary}</td>
                        <td>
                            <Link to={`/screate/${_id}`}>
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

export default SalaryUser;
