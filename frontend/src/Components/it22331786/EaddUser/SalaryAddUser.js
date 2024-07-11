import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";

function SalaryAddUser() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({
        basicsalary: "",
        othours: "",
        AmountOTH: "",
        bonus: "",
        totalsalary: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Basic validation
        if (name === "basicsalary" || name === "othours" || name === "AmountOTH" || name === "bonus") {
            // Ensure only numbers with optional decimal point are entered
            if (!/^\d*\.?\d*$/.test(value)) {
                return; // Exit early if input is invalid
            }
        }

        // Update the specific field being changed
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Calculate total salary if the bonus field is changing
        if (name === "bonus") {
            let totalSalary = (parseFloat(inputs.basicsalary || 0) * 100) + 
                             (parseFloat(inputs.othours || 0) * parseFloat(inputs.AmountOTH || 0)) * 100 + 
                             (parseFloat(value || 0) * 100);

            // Update the total salary field
            setInputs(prevState => ({
                ...prevState,
                totalsalary: isNaN(totalSalary) ? "" : (totalSalary / 100).toFixed(2) // Convert to string with 2 decimal places
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send data to the server
            await axios.post("http://localhost:5000/saddusers", {
                basicsalary: String(inputs.basicsalary),
                othours: String(inputs.othours),
                AmountOTH: Number(inputs.AmountOTH),
                bonus: String(inputs.bonus),
                totalsalary: inputs.totalsalary
            });
            toast.success("Successfully Added!");
            history('/screate');
        } catch (err) {
            console.error(err);
            toast.error("Failed to add user");
        }
    };

    return (
        <div>
            <div className='empty'></div>
            <div className="form-container">
                <h1>CALCULATE PAYROLL</h1>
                <form onSubmit={handleSubmit}>
                    <label>Basic Salary (LKR)</label>
                    <input type="text" name="basicsalary" onChange={handleChange} value={inputs.basicsalary} required />
                    <label>OT Hours</label>
                    <input type="text" name="othours" onChange={handleChange} value={inputs.othours} required />
                    <label>Amount for OT (LKR)</label>
                    <input type="text" name="AmountOTH" onChange={handleChange} value={inputs.AmountOTH} required />
                    <label>Bonus (LKR)</label>
                    <input type="text" name="bonus" onChange={handleChange} value={inputs.bonus} required />
                    <label>Total Salary (LKR)</label>
                    <input type="text" name="totalsalary" value={inputs.totalsalary} readOnly />
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default SalaryAddUser;
