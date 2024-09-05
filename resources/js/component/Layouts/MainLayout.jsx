import React from "react";
import Navbar from "../shared/navBar";
import { useLocation } from "react-router-dom";

const Mainlayout = ({ children }) => {
    const location = useLocation();

    return (
        <>
            <Navbar route={location.pathname} />
            {children}
        </>
    );
};

export default Mainlayout;
