import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/Context";

// Protects pages that need login (meals, cart, checkout, etc.)
export function ProtectedRoute({ children }) {
    const token = localStorage?.getItem('token');

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}

// Prevents logged-in users from going back to login/signup
export function PublicRoute({ children }) {
    const token = localStorage?.getItem('token');

    if (token) {
        return <Navigate to="/dashBoard" replace />;
    }

    return children;
}