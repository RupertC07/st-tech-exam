import React from "react";

const Pagination = ({
    currentpage,
    next = null,
    prev = null,
    handlePaginate,
}) => {
    return (
        <div className="join">
            <button
                className="join-item btn btn-secondary"
                disabled={prev ? false : true}
                onClick={() => handlePaginate(prev)}
            >
                «
            </button>
            <button className="join-item btn btn-secondary">
                Page {currentpage}
            </button>
            <button
                className="join-item btn btn-secondary"
                disabled={next ? false : true}
                onClick={() => handlePaginate(next)}
            >
                »
            </button>
        </div>
    );
};

export default Pagination;
