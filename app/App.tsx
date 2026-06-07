import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./routes/dashboard";
import Home from "./routes/home";
import Users from "./routes/users";
import Analytics from "./routes/analytics";
import Login from "./routes/login";

import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./components/navbar/ProfileButton/ProfilePage";
import SettingsPage from "./components/SettingsPage/SettingsPage";

import useDevShortcuts from "./routes/useDevShortcuts";

export default function App() {
  useDevShortcuts();

  const isGitHubPages = window.location.hostname.includes("github.io");
  const basename = isGitHubPages ? "/dashboard" : "/";

  return (
    <BrowserRouter basename={basename}>
      <div className="absolute justify-self-center rounded-lg w-fit text-center z-0 px-3 py-1 border border-white light:border-black bg-black/25 text-white light:text-black text-xs">
        !! FOR DEV PURPOSES ONLY (TEMPORARY) !! <br />
        (ANIMATIONS) CTRL + C | (THEME) CTRL + V | (MODE) CTRL + B
      </div>
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
