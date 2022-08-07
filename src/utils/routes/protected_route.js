import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (auth) {
    return <Navigate to="/hoje" />;
  }
  return children;
}

