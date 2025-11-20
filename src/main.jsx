// --- GH Pages SPA route restore (must be first in main.jsx) ---
try {
  const ghRedirect = sessionStorage.getItem("gh_redirect");
  if (ghRedirect) {
    sessionStorage.removeItem("gh_redirect");
    // Vite's base URL (with trailing slash) if set; fallback to '/Purchase_Tracker2/'
    const base = import.meta.env.BASE_URL || "/Purchase_Tracker2/";
    // remove trailing slash from base for concatenation
    const baseTrim = base.endsWith("/") ? base.slice(0, -1) : base;
    // build target preserving original path
    const target =
      baseTrim + (ghRedirect.startsWith("/") ? ghRedirect : "/" + ghRedirect);
    // update browser URL for Router without reloading (React Router will handle route)
    window.history.replaceState({}, "", target);
  }
} catch (e) {
  // ignore any sessionStorage errors
}
// --- end restore block ---

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
