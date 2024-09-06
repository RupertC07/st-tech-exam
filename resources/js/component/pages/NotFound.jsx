import React from "react";
import AppButton from "../shared/button";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/");
    };
    return (
        <div className="h-screen">
            <div className="flex  items-center justify-center h-screen">
                <div className="card bg-base-100 w-96 shadow-xl">
                    <div className="card-body">
                        <div className="text-center">
                            <p className="text-secondary text-2xl">404</p>
                            <p className="text-lg">Are you lost?</p>
                            <div className="p-2">
                                <AppButton
                                    className="btn btn-ghost"
                                    onClick={handleNavigate}
                                >
                                    Back
                                </AppButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
