import React from "react";

const Loader = () => {
    return (
        <div className="absolute top-0 left-0  h-full w-full z-50  flex justify-center items-center bg-secondary bg-opacity-20">
            <span className="loading loading-infinity loading-lg"></span>
        </div>
    );
};

export default Loader;
