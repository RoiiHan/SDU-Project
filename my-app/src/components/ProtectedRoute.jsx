import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role != "user") {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
