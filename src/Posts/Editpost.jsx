import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const [searchParams] = useSearchParams();
  const postId = searchParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: "",
  });

  const getPost = async () => {
    try {
      const post = await axios.get(`https://dummyjson.com/posts/${postId}`);
      setFormData({
        title: post.data.title,
        body: post.data.body,
        userId: post.data.userId,
      });
    } catch (error) {
      console.error("Error fetching post: ", error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

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
      const response = await axios.put(
        `https://dummyjson.com/posts/${postId}`,
        formData
      );
      if (response.status === 200) {
        navigate("/posts");
      } else {
        alert("Post update failed");
      }
    } catch (error) {
      alert("An error occurred while updating the post");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Post {postId}</h2>
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

export default EditPost;
