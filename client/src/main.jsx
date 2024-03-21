import React from "react";
import ReactDOM from "react-dom/client";
import { LoginProvider } from "./contexts/LoginContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </LoginProvider>
  </React.StrictMode>
);
