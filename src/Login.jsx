import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    const data = {
      ...formData,
      [name]: value,
    };
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://dummyjson.com/user/login`,
        formData
      );
      if (response.status == 200) {
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/users");
      } else {
        alert("User creation failed");
      }
    } catch (error) {
      const errorMsg = error.response.data.message;
      alert(errorMsg);
      console.log("Login failed", error);
    }

    // navigate("/user");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          Username
          <input
            className="form-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </label>
        <label className="form-label">
          Password
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </label>
        <button className="form-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
