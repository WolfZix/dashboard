import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const username = localStorage.getItem("username");
  const isGitHubPages = window.location.hostname.includes("github.io");
  const basename = isGitHubPages ? "/dashboard/login" : "/";

  if (!username) return <Navigate to={basename} replace />;
  return children;
}
