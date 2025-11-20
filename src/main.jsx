// --- GH Pages SPA route restore (must be first in main.jsx) ---
try {
  const ghRedirect = sessionStorage.getItem("gh_redirect");
  if (ghRedirect) {
    sessionStorage.removeItem("gh_redirect");

    // Vite base (with trailing slash if set); fallback to project base:
    const base = import.meta.env.BASE_URL || "/Purchase_Tracker2/";
    // remove trailing slash for safe comparisons/concat
    const baseTrim = base.endsWith("/") ? base.slice(0, -1) : base;

    let target;
    if (!baseTrim || baseTrim === "") {
      // root site, saved path is already the correct full path
      target = ghRedirect;
    } else if (ghRedirect.startsWith(baseTrim)) {
      // saved path already contains the base (e.g. '/Purchase_Tracker2/login')
      target = ghRedirect;
    } else {
      // saved path is just the route (e.g. '/login') — prepend base
      target =
        baseTrim + (ghRedirect.startsWith("/") ? ghRedirect : "/" + ghRedirect);
    }

    // finally replace the browser URL (no reload) so React Router can render it
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
import { HashRouter, Routes, Route } from "react-router-dom";
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
