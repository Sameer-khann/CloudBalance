import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function ProtectedRoute({ children }) {

    const isLogin = localStorage.getItem('Islogin');

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate('/');
        }
    }, [isLogin, navigate])




    return children
}