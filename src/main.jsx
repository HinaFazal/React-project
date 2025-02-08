import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./Users/Users";
import CreateUser from "./Users/CreateUser";
import EditUser from "./Users/EditUser";
import Posts from "./Posts/Posts";
import Editpost from "./Posts/Editpost";
import CreatePost from "./Posts/createpost";
import Navbar from "./Navbar";
import "./Navbar.css";
import "./App.css";
import Login from "./login";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />

        <Route path="/users" element={<Users />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/edit-post" element={<Editpost />} />
        <Route path="/create-post" element={<CreatePost />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
