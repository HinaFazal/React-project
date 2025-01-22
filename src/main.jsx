import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import CreateUserForm from "./CreateUserForm";
import EditUserForm from "./EditUserForm";
import PostPage from "./postPage";
import PostEdits from "./PostEdits";
import PostCreate from "./postcreate";
import Navbar from "./Navbar";
import "./Navbar.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/users" element={<App />} />
        <Route path="/create-user" element={<CreateUserForm />} />
        <Route path="/edit-user" element={<EditUserForm />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/edit-post" element={<PostEdits />} />
        <Route path="/create-post" element={<PostCreate />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
