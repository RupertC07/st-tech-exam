import React from "react";

const StatCard = ({ label, icon, value, description = null }) => {
    const formattedValue = parseInt(value).toLocaleString();
    return (
        <div className="card bg-base-100 w-96 rounded-xl shadow-xl">
            <div className="stat">
                <div className="stat-figure text-secondary text-2xl">
                    {icon}
                </div>
                <div className="stat-title">{label}</div>
                <div className="stat-value">{formattedValue}</div>
                <div className="stat-desc">{description}</div>
            </div>
        </div>
    );
};

export default StatCard;
