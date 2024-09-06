import React from "react";
import { MdLogout } from "react-icons/md";
import { CgMenuLeftAlt } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import AppButton from "./button";
import { signout } from "../Services/AuthUser";

const Navbar = ({ route }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async ({ route }) => {
        await signout(logout, navigate);
    };
    return (
        <div className="p-6">
            <div className="navbar bg-base-100 rounded-lg ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} className="btn btn-ghost lg:hidden">
                            <span className="text-4xl">
                                <CgMenuLeftAlt />
                            </span>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/employee">Employees</Link>
                            </li>
                        </ul>
                    </div>
                    <span className="btn btn-ghost text-xl">HRS</span>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li>
                            <Link
                                to="/"
                                className={
                                    route == "/"
                                        ? "text-secondary font-bold"
                                        : ""
                                }
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/employee"
                                className={
                                    route == "/employee"
                                        ? "text-secondary font-bold"
                                        : ""
                                }
                            >
                                Employees
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="tooltip tooltip-bottom" data-tip="Log out">
                        <AppButton
                            className={
                                "btn bg-secondary text-base-100 hover:text-secondary "
                            }
                            onClick={handleLogout}
                        >
                            <MdLogout />
                        </AppButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
