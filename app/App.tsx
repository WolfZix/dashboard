import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./routes/dashboard";
import Home from "./routes/home";
import Users from "./routes/users";
import Analytics from "./routes/analytics";
import Login from "./routes/login";

import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./components/navbar/ProfileButton/ProfilePage";
import SettingsPage from "./components/SettingsPage/SettingsPage";

import DevShortcuts from "./components/DevShortcuts";

export default function App() {
  const isGitHubPages = window.location.hostname.includes("github.io");
  const basename = isGitHubPages ? "/dashboard" : "/";

  return (
    <BrowserRouter basename={basename}>
      <DevShortcuts />
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
  );
}
