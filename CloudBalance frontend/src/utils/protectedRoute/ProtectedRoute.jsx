import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // const token = localStorage.getItem("token");

  const user = useSelector(state => state.sidebar.user);

  if (!user.token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
