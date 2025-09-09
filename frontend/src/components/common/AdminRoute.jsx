import { Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore.js";

// Admin Protected Route Wrapper
export const AdminRoute = ({ children }) => {
  const { authUser } = useAuthStore();
  if (!authUser || authUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return children;
};
