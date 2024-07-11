import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function UpdateVariety() {
  const [inputs, setInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();
  const id = useParams().id;

  // Get the variety data for updating
  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/varieties/${id}`)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          setInputs(data.Variety);
          setIsLoading(false);
        });
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/varieties/${id}`, {
        varietyName: String(inputs.varietyName),
      })

      .then((res) => res.data);
  };

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

  return (
    <div>
      {isLoading ? ( // Render a loading message if data is still being fetched
        <p>Loading...</p>
      ) : (
        <form onSubmit={submitHandler}>
          <label>Variety name</label>
          <input
            type="text"
            name="varietyName"
            onChange={handleChange}
            value={inputs.varietyName || ""}
            required
          />
          <br />
          <button className="updateVarietySubmitBtn">Update</button>
        </form>
      )}
    </div>
  );
}

export default UpdateVariety;
