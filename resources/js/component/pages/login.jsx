import React from "react";
import { useState } from "react";
import LoginForm from "../shared/forms/login";
import Loader from "../shared/loader";

const Login = () => {
    const [loader, setLoader] = useState(false);
    return (
        <div>
            {/* {loader ? <Loader /> : ""} */}
            <div className="bg-neutral">
                <div className="flex  items-center justify-center h-screen z-50">
                    <div className="card card-compact bg-base-100 w-96 shadow-xl p-5">
                        <div className="card-body">
                            <h2 className="text-center text-2xl font-bold">
                                Welcome!
                            </h2>
                            <LoginForm></LoginForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
