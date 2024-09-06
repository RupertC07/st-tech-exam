import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Mainlayout from "../Layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import LoginRoute from "./LoginRoute";
import Employee from "../pages/employee";
import NotFound from "../pages/NotFound";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute
                            element={
                                <Mainlayout>
                                    <Dashboard />
                                </Mainlayout>
                            }
                        />
                    }
                />
                <Route
                    path="/employee"
                    element={
                        <ProtectedRoute
                            element={
                                <Mainlayout>
                                    <Employee />
                                </Mainlayout>
                            }
                        />
                    }
                />
                <Route
                    path="/login"
                    element={<LoginRoute element={<Login></Login>} />}
                />
                <Route path="/*" element={<NotFound></NotFound>} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
