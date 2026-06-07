import React from "react";
import ReactDOM from "react-dom/client";

import "./main.css";
import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";
import { AnimationProvider } from "./context/AnimationContext";
import { ModeProvider } from "./context/ModeContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AnimationProvider>
      <ThemeProvider>
        <ModeProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </ModeProvider>
      </ThemeProvider>
    </AnimationProvider>
  </React.StrictMode>,
);
