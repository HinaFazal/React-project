import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      backgroundColor: "black",
      color: "white",
      fontSize: "17px",
      fontWeight: "bolder",
    },
  },
};

function PostPage() {
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
    try {
      const response = await axios.delete(
        `https://dummyjson.com/posts/${postId}`
      );
      if (response.status === 200) {
        setShouldUpdate(true);
        alert(`Post ${postId} deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post?id=${postId}`);
  };

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filteredRecords = records.filter((item) =>
      item.title.toLowerCase().includes(query)
    );
    setRecords(filteredRecords);
  };

  const getPosts = async () => {
    try {
      const response = await axios.get("https://dummyjson.com/posts");
      setRecords(response.data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      alert("Failed to fetch data. Please try again later.");
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
        <input
          type="text"
          placeholder="Search by title"
          onChange={handleChange}
        />
        <button className="createBtn Btn" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
      {records && records.length ? (
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          // pagination
          responsive
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
}

export default PostPage;
