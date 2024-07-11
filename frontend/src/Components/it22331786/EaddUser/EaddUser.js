import React, { useState } from 'react';
import { useNavigate } from "react-router";
import axios from 'axios';
import './EaddUser.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function EaddUser() {
    const history = useNavigate();
    const [inputs, setInputs] = useState({ 
        username: "",
        name: "",
        NIC: "",
        Gender: "",
        Email: "",
        DOB: null,
        password: "",
        contactno: "",
        includeV: false, 
    });
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        
        if (name === 'includeV') {
            setInputs((prevState) => ({
                ...prevState,
                [name]: checked,
            }));
        } else if (name === 'Email') {
            const emailPattern = /\S+@\S+\.\S+/;
            if (emailPattern.test(value)) {
                setInputs((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: '',
                }));
            } else {
                setInputs((prevState) => ({
                    ...prevState,
                    [name]: value,
                }));
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: 'Invalid Email format',
                }));
            }
        } else {
            setInputs((prevState) => ({
                ...prevState,
                [name]: value,
            }));
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
    };

    const handleDOBChange = (date) => {
        setInputs((prevState) => ({
            ...prevState,
            DOB: date,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            sendRequest().then(() => {
                history('/ecreate');
                toast.success("Successfully Added!");
            }).catch(error => {
                toast.error("Error adding user. Please try again.");
            });
        }
    };

    const validate = () => {
        let isValid = true;
        const errors = {};

        if (!inputs.username.trim()) {
            errors.username = "User Name is required";
            isValid = false;
        }

        if (!inputs.name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }

        if (!inputs.NIC.trim()) {
            errors.NIC = "NIC is required";
            isValid = false;
        } else if (!(/^(?:\d{9}(?:V|v)?|\d{12})$/.test(inputs.NIC.trim()))) {
            errors.NIC = "NIC should be a 9-digit number optionally followed by 'V' or a 12-digit number";
            isValid = false;
        }

        if (!inputs.Gender.trim()) {
            errors.Gender = "Gender is required";
            isValid = false;
        }

        if (!inputs.Email.trim()) {
            errors.Email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(inputs.Email.trim())) {
            errors.Email = "Invalid Email format";
            isValid = false;
        }

        if (!inputs.DOB) {
            errors.DOB = "Date of Birth is required";
            isValid = false;
        }

        if (!inputs.password.trim()) {
            errors.password = "Password is required";
            isValid = false;
        }

        if (!inputs.contactno.trim()) {
            errors.contactno = "Contact No is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(inputs.contactno.trim())) {
            errors.contactno = "Invalid Contact No format";
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const sendRequest = async () => {
        await axios.post("http://localhost:5000/eusers", {
            username: inputs.username.trim(),
            name: inputs.name.trim(),
            NIC: Number(inputs.NIC),
            Gender: inputs.Gender.trim(),
            Email: inputs.Email.trim(),
            DOB: inputs.DOB,
            password: inputs.password.trim(),
            contactno: Number(inputs.contactno),
        }).then(res => res.data);
    };

    return (
        <div className="c1786">
            <div className="e1786"></div>
            <div className="f-c1786">
                <h1>ADD EMPLOYEE DETAILS</h1>
                <form onSubmit={handleSubmit}>
                    <div className="f-p1786">
                        <label className="label-1786">User Name</label>
                        <input type="text" name="username" onChange={handleChange} value={inputs.username} className="input-1786" required />
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>
                    <div className="f-p1786">
                        <label className="label-1786">Name</label>
                        <input type="text" name="name" onChange={handleChange} value={inputs.name} className="input-1786" required />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="f-p1786">
                        <label className="label-1786">NIC</label>
                        <input type="text" name="NIC" onChange={handleChange} value={inputs.NIC} className="input-1786" required />
                        {errors.NIC && <span className="error">{errors.NIC}</span>}
                    </div>
                    <div className="f-p1786">
                        <label className="label-1786">
                            <input type="checkbox" name="includeV" onChange={handleChange} checked={inputs.includeV} />
                            'V'
                        </label>
                    </div>
                    <div className="f-p1786">
                        <label className="label-1786">Gender</label>
                        <div className="gender-buttons">
                            <label>
                                <input type="radio" name="Gender" value="Male" onChange={handleChange} checked={inputs.Gender === 'Male'} />
                                Male
                                <input type="radio" name="Gender" value="Female" onChange={handleChange} checked={inputs.Gender === 'Female'} />
                                Female
                            </label>
                        </div>
                        {errors.Gender && <span className="error">{errors.Gender}</span>}
                    </div>
                    <div className="f-p1786">
                        <label className="label-1786">Email</label>
                        <input type="text" name="Email" onChange={handleChange} value={inputs.Email} className="input-1786" required />
                        {errors.Email && <span className="error">{errors.Email}</span>}
                    </div>
                    <div className="f-p1786">
                        <label className="label-1786">DOB</label>
                        <div className="dob-input">
                            <DatePicker
                                selected={inputs.DOB}
                                onChange={handleDOBChange}
                                dateFormat="dd/MM/yyyy"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                name="DOB"
                                className="form-control"
                                placeholderText="Select DOB"
                                maxDate={new Date()} 
                                required
                            />
                            <i className="fas fa-calendar-alt"></i>
                        </div>
                        {errors.DOB && <span className="error">{errors.DOB}</span>}
                    </div>
                    <div className="f-p1786">
                        <label className="label-1786">Password</label>
                        <input type="password" name="password" onChange={handleChange} value={inputs.password} className="input-1786" required />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <div className="f-p1786">
                        <label className="label-1786">Contact No</label>
                        <input type="text" name="contactno" onChange={handleChange} value={inputs.contactno} className="input-1786" required />
                        {errors.contactno && <span className="error">{errors.contactno}</span>}
                    </div>
                    <button className="button-1786">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default EaddUser;
