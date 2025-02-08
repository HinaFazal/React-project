import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://dummyjson.com/posts/add`,
        formData
      );
      if (response.status === 200) {
        navigate("/posts");
      } else {
        alert("Post creation failed");
      }
    } catch (error) {
      alert("An error occurred while creating the post");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Post</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">
          Title
          <input
            className="form-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter post title"
          />
        </label>
        <label className="form-label">
          Body
          <textarea
            className="form-input"
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Enter post content"
          />
        </label>
        <label className="form-label">
          User ID
          <input
            className="form-input"
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder="Enter user ID"
          />
        </label>
        <button className="form-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
