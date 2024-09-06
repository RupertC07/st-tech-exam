import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Initially null to indicate loading state

    // Check if token exists in cookies when the component mounts
    useEffect(() => {
        const token = Cookies.get("auth-token");

        if (token) {
            setIsAuthenticated(true); // Set isAuthenticated to true if token exists
        } else {
            setIsAuthenticated(false); // Set isAuthenticated to false if no token exists
        }
    }, []); // Only run on component mount

    const login = (token) => {
        Cookies.set("auth-token", token, { expires: 1 }); // Set token in cookies
        setIsAuthenticated(true); // Set authenticated state to true upon login
    };

    const logout = () => {
        Cookies.remove("auth-token"); // Remove token from cookies
        setIsAuthenticated(false); // Set authenticated state to false upon logout
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
