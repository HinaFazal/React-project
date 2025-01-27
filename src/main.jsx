import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./Users/Users";
import CreateUser from "./Users/CreateUser";
import EditUser from "./Users/EditUser";
import PostPage from "./Posts";
import PostEdits from "./PostEdits";
import PostCreate from "./postcreate";
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
        <Route path="/posts" element={<PostPage />} />
        <Route path="/edit-post" element={<PostEdits />} />
        <Route path="/create-post" element={<PostCreate />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
