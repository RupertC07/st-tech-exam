import React, { useState } from "react";
import Navbar from "../shared/navBar";
import Analytics from "../shared/analytics";
import Loader from "../shared/loader";

const Dashboard = () => {
    const [loader, setLoader] = useState(false);
    return (
        <div>
            <Analytics setLoader={setLoader}></Analytics>
            {loader ? <Loader></Loader> : ""}
        </div>
    );
};

export default Dashboard;
