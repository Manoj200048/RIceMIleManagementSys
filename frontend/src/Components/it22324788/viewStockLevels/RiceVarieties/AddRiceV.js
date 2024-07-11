import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddRiceV() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    varietyName: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => history("/riceVarieties"));
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/varieties", {
        varietyName: String(inputs.varietyName),
      })
      .then((res) => res.data);
  };
  return (
    <div>
      <h1 className="addVH1">Add variety</h1>
      <form onSubmit={submitHandler}>
        <label>Variety name</label>
        <input
          type="text"
          name="varietyName"
          onChange={handleChange}
          value={inputs.varietyName}
          required
        ></input>
        <br />
        <button className="addVarietySubmitBtn">Add</button>
      </form>
    </div>
  );
}

export default AddRiceV;
