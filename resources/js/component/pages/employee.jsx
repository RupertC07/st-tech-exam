import React, { useState } from "react";

import Loader from "../shared/loader";

import EmployeeTable from "../shared/table";

const Employee = () => {
    const [loader, setLoader] = useState(false);

    return (
        <div>
            <EmployeeTable setLoader={setLoader}></EmployeeTable>

            {loader ? <Loader></Loader> : ""}
        </div>
    );
};

export default Employee;
