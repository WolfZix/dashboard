import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./main.css";
import Dashboard from "./routes/dashboard";
import Home from "./routes/home";
import Users from "./routes/users";
import Analytics from "./routes/analytics";
import Login from "./routes/login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./components/navbar/ProfileButton/ProfilePage";
import SettingsPage from "./components/SettingsPage/SettingsPage";

import { ThemeProvider } from "./context/ThemeContext";
import { AnimationProvider } from "./context/AnimationContext";
import { ModeProvider } from "./context/ModeContext";
import { UserProvider } from "./context/UserContext";

const isGitHubPages = window.location.hostname.includes("github.io");
const basename = isGitHubPages ? "/dashboard" : "/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AnimationProvider>
      <ThemeProvider>
        <ModeProvider>
          <UserProvider>
            <BrowserRouter basename={basename}>
              <Routes>
                <Route path="login" element={<Login />} />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Home />} />
                  <Route path="users" element={<Users />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="profile/:username" element={<ProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </UserProvider>
        </ModeProvider>
      </ThemeProvider>
    </AnimationProvider>
  </React.StrictMode>,
);
