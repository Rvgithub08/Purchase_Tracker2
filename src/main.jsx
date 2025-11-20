// Restore original path when redirected by GH Pages 404.html
try {
  const ghRedirect = sessionStorage.getItem("gh_redirect");
  if (ghRedirect) {
    sessionStorage.removeItem("gh_redirect");
    // import.meta.env.BASE_URL is the Vite base (set in vite.config.js).
    const base = import.meta.env.BASE_URL || "/Purchase_Tracker2/";
    // build target URL by combining base (without trailing slash) + saved path
    const baseTrim = base.endsWith("/") ? base.slice(0, -1) : base;
    const target =
      baseTrim + (ghRedirect.startsWith("/") ? ghRedirect : "/" + ghRedirect);
    // Replace browser URL without reloading page (so React Router will handle it)
    window.history.replaceState({}, "", target);
  }
} catch (e) {
  // ignore
}

import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
