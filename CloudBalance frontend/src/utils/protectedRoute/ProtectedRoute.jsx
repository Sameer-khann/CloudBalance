import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}




















// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";



// export default function ProtectedRoute({ children }) {

//     const isLogin = localStorage.getItem('token');

//     const navigate = useNavigate();

//     useEffect(() => {
//         if (!isLogin) {
//             navigate('/');
//         }
//     }, [isLogin, navigate])




//     return children
// }