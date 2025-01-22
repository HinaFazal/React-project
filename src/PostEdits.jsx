import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./App.css";

function PostEdits() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/posts/${userId}?select=firstName,lastName,email,phone,role`
      );
      const data = response.data;

     
      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      getPosts();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Data:", formData);

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

export default PostEdits;
