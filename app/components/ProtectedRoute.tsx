import { Navigate } from "react-router-dom";
import { getUsername } from "../services/authService";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const username = getUsername();

  if (!username) return <Navigate to="/login" replace />;
  return children;
}
