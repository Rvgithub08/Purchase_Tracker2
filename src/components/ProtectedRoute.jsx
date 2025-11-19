import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    window.location.href = "/login";
    return null;
  }
  return <>{children}</>;
}
