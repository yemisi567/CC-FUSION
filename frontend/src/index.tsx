import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import NavProvider from "./context/nav/NavProvider";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/auth/AuthContext";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NavProvider>
      <AuthProvider>
        <Theme>
          <App />
        </Theme>
      </AuthProvider>
    </NavProvider>
    <Toaster position="top-right" />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
