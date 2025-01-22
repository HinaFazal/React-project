import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { data } from "./assets/data";
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

function App() {
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
            edit
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
    console.log("resp: ", response);
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
    const users = await axios.get(
      "https://dummyjson.com/users?select=firstName,lastName,email,phone,role,hair"
    );
    setRecords(users?.data?.users);
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
export default App;
