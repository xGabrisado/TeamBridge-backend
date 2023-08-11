// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { defaultTheme } from "./theme/defaultTheme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider theme={defaultTheme}>
    <App />
  </ThemeProvider>
  // </React.StrictMode>,
);
