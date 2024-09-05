import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import Loader from "../shared/loader";

const LoginRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        return <div className="bg-neutral">{/* <Loader></Loader> */}</div>; // Show loading or nothing while checking the token
    }

    return isAuthenticated ? <Navigate to="/" /> : element;
};

export default LoginRoute;
