import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import Loader from "../shared/loader";

const ProtectedRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        return <div className="bg-neutral">{/* <Loader></Loader> */}</div>;
    }

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
