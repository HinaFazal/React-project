import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Details: ", formData);

    navigate("/posts");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          Email
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
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
