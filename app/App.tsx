import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useUser } from "./context/UserContext";
import { Navigate } from "react-router-dom";

import Dashboard from "./routes/dashboard";
import Home from "./routes/home";
import Users from "./routes/users";
import Analytics from "./routes/analytics";
import Login from "./routes/login";

import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./components/navbar/ProfileButton/ProfilePage";
import SettingsPage from "./components/SettingsPage/SettingsPage";

import Shortcuts from "./components/Shortcuts";

export default function App() {
  const isGitHubPages = window.location.hostname.includes("github.io");
  const basename = isGitHubPages ? "/dashboard" : "/";
  const { currentUser } = useUser();

  return (
    <BrowserRouter basename={basename}>
      <Shortcuts />
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
          <Route
            path="analytics"
            element={
              currentUser === null ? null : [
                  "Admin",
                  "Moderator",
                  "Premium",
                ].includes(currentUser.role) ? (
                <Analytics />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
