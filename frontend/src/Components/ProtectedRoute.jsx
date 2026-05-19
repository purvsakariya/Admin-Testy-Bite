import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/Context";

// Protects pages that need login (meals, cart, checkout, etc.)
export function ProtectedRoute({ children }) {
    const { user } = useContext(Context);

    if (!user?.accessToken) {
        return <Navigate to="/" replace />;
    }

    return children;
}

// Prevents logged-in users from going back to login/signup
export function PublicRoute({ children }) {
    const { user } = useContext(Context);

    if (user?.accessToken) {
        return <Navigate to="/meals" replace />;
    }

    return children;
}