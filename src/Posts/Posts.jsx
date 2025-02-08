import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { customStyles } from "../utils/constants";

function Posts() {
  const [records, setRecords] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const navigate = useNavigate();

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Body",
      selector: (row) => row.body,
    },
    {
      name: "User ID",
      selector: (row) => row.userId,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (row) => (
        <div>
          <button className="editBtn Btn" onClick={() => handleEdit(row.id)}>
            Edit
          </button>
          <button
            className="deleteBtn Btn"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = async (postId) => {
    const response = await axios.delete(
      `https://dummyjson.com/posts/${postId}`
    );
    if (response.status === 200) {
      setShouldUpdate(true);
      alert(`Post ${postId} deleted Successfully`);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post?id=${postId}`);
  };

  const getPosts = async () => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("user"));
      if (!loggedInUser) {
        navigate("/login");
        return;
      }
      const config = {
        headers: {
          Authorization: `Bearer ${loggedInUser.accessToken}`,
        },
      };
      const posts = await axios.get(
        "https://dummyjson.com/auth//posts ",
        config
      );
      setRecords(posts?.data?.posts);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("user");
        navigate("/posts");
      }
      console.log("Error fetching posts", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, [shouldUpdate]);

  const handleCreatePost = () => {
    navigate("/create-post");
  };
  return (
    <div className="homeDiv">
      <div className="search">
        <h2>Posts List</h2>
        <button className="createBtn Btn" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
      {records && records.length ? (
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
        />
      ) : (
        "loading..."
      )}
    </div>
  );
}
export default Posts;
