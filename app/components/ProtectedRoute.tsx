import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const username = localStorage.getItem("username");

  if (!username) return <Navigate to="login" replace />;
  return children;
}
