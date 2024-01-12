import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8888/api/student/get-report"
        );
        setData(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    roll_number: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8888/api/student/",
        formData
      );
      console.log("Response:", response.data);
      setFormData({ name: "", roll_number: "" });
      alert("saved");
      // Handle the response as needed
    } catch (error) {
      console.error("Error:", error);
      // Handle errors
    }
  };
  console.log("data:", data);
  return (
    <div>
      <div>
        <b>Create Student</b>
        <form onSubmit={handleSubmit}>
          <br />
          <table>
            <tr>
              <td>Name:</td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td> Roll Number:</td>
              <td>
                <input
                  type="text"
                  name="roll_number"
                  value={formData.roll_number}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit">Submit</button>
              </td>
            </tr>
          </table>
          <br />
        </form>
      </div>
      <hr />
      <b>Attendance List</b>{" "}
      {data.map((item, key) => (
        <b>{item.name}</b>
      ))}
    </div>
  );
}

export default App;
