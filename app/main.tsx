import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./app.css";

import Dashboard from "./routes/dashboard";
import Home from "./routes/home";
import Users from "./routes/users";
import Analytics from "./routes/analytics";
import Login from "./routes/login";

const isGitHubPages = window.location.hostname.includes("github.io");
const basename = isGitHubPages ? "/dashboard" : "/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Dashboard />}>
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
