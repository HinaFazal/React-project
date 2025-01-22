import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function CreateUserForm() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
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
    console.log("User Created: ", formData);

    navigate("/");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create User</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          First Name
          <input
            className="form-input"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </label>
        <label className="form-label">
          Last Name
          <input
            className="form-input"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </label>
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
          Phone
          <input
            className="form-input"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </label>
        <button className="form-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
export default CreateUserForm;
