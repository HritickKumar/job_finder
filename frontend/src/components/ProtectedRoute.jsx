import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (!token) return <Navigate to="/login" />;

    if (role && userType !== role) return <Navigate to="/login" />;

    return children;
}
