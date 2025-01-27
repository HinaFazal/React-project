import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "../assets/data";
import axios from "axios";
import DataTable from "react-data-table-component";
import { customStyles } from "../utils/constants";

function Users() {
  const [records, setRecords] = useState(null);
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const navigate = useNavigate();

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.firstName,
    },
    {
      name: "Last Name",
      selector: (row) => row.lastName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      format: (row) => <>{row.role.toUpperCase()}</>,
    },
    {
      name: "Hair Color",
      selector: (row) => row.hair.color,
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

  const handleDelete = async (userId) => {
    const response = await axios.delete(
      `https://dummyjson.com/users/${userId}`
    );
    if (response.status == 200) {
      setShouldUpdate(true);
      alert(`User ${userId} deleted Successfully`);
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edit-user?id=${userId}`);
  };

  const handleChange = (e) => {
    let query = e.target.value;
    const newRecords = data.filter((item) =>
      item.firstName.toLocaleLowerCase().includes(query.toLocaleLowerCase())
    );
    setRecords(newRecords);
  };

  const getUsers = async () => {
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
      const users = await axios.get(
        "https://dummyjson.com/auth/users?select=firstName,lastName,email,phone,role,hair",
        config
      );
      setRecords(users?.data?.users);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("user");
        navigate("/login");
      }
      console.log("Error fetching users", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [shouldUpdate]);

  const handleCreateUser = () => {
    navigate("/create-user");
  };
  return (
    <div className="homeDiv">
      <div className="search">
        <h2>Users List</h2>
        <input
          type="text"
          placeholder="search by name"
          onChange={handleChange}
        />
        <button className="createBtn Btn" onClick={handleCreateUser}>
          Create User
        </button>
      </div>
      {records && records.length ? (
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}

          // pagination
        />
      ) : (
        "loading..."
      )}
    </div>
  );
}
export default Users;
