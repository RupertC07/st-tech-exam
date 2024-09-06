import React from "react";

export const TextBox = ({
    value,
    onChange,
    label = "Input",
    placeholder = "Type Here",
    viewOnly,
}) => {
    return (
        <>
            <label className="p-2 text-sm font-medium">{label}</label>
            <br />
            <input
                readOnly={viewOnly}
                value={value}
                onChange={onChange}
                type="text"
                placeholder={placeholder}
                className="input input-bordered w-full mt-1"
            />
        </>
    );
};

export const DatePicker = ({
    value,
    onChange,
    label = "Input",
    placeholder = "Type Here",
    viewOnly,
}) => {
    return (
        <>
            <label className="p-2  text-sm font-medium">{label}</label>
            <br />
            <input
                readOnly={viewOnly}
                value={value}
                onChange={onChange}
                type="date"
                className="input input-bordered w-full mt-1"
            />
        </>
    );
};

export const NumBox = ({
    value,
    onChange,
    label = "number",
    placeholder = "Type Here",
    viewOnly,
}) => {
    return (
        <>
            <label className="p-2  text-sm font-medium">{label}</label>
            <br />
            <input
                readOnly={viewOnly}
                value={value}
                onChange={onChange}
                type="number"
                className="input input-bordered w-full mt-1"
                placeholder="Type Here"
            />
        </>
    );
};

export const SelectBox = ({
    value,
    onChange,
    label = "number",
    placeholder = "Type Here",
    options = [],
    viewOnly,
}) => {
    return (
        <>
            <label className="p-2 text-sm font-medium">{label}</label>
            <br />
            <select
                disabled={viewOnly}
                className="select select-bordered w-full "
                value={value}
                onChange={onChange}
            >
                <option disabled value="">
                    {placeholder}
                </option>
                {options.map((opt, index) => (
                    <option key={index} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </>
    );
};
