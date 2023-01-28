import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const ProtectedRoute = ({ children }) => {
    const { value } = useAuth();
    if (!value.token) {
        console.log("A valid token is need to go to landing page.")
        return <Navigate to="/home" replace />;
    }
    return children;
}; 
