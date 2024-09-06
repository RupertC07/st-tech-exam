import React from "react";

const AppButton = ({
    isLoading,
    onClick,
    children,
    className = "btn btn-secondary w-full rounded-3xl",
}) => {
    return (
        <button disabled={isLoading} onClick={onClick} className={className}>
            {children}
        </button>
    );
};

export default AppButton;
