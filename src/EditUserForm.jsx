import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./App.css";

function EditUserForm() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const getUser = async () => {
    const user = await axios.get(
      `https://dummyjson.com/users/${userId}?select=firstName,lastName,email,phone,role`
    );
    console.log("user: ", user);
  
  };

  useEffect(() => {
    getUser();
  }, []); 

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
      <h2 className="form-title">Edit User {userId}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          First Name
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </label>
        <label className="form-label">
          Last Name
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={formData.lastName}
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
export default EditUserForm;
