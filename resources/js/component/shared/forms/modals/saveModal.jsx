import React, { useEffect, useState } from "react";
import AppButton from "../../button";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { DatePicker, NumBox, SelectBox, TextBox } from "../inputs/input";
import { addNew, fetchEmployee, update } from "../../../Services/Employee";

const SaveModal = ({
    id,
    setLoader,
    onClose,
    viewOnly = false,
    handleFetch,
    employee = null,
}) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [bdate, setBdate] = useState("");
    const [gender, setGender] = useState("");
    const [salary, setSalary] = useState("");

    const handleShow = async () => {
        try {
            setLoader(true);
            const record = await fetchEmployee(id);
            if (record) {
                // console.log(record);
                setFname(record.data.employee.first_name);
                setLname(record.data.employee.last_name);
                setBdate(record.data.employee.birthdate);
                setSalary(record.data.employee.monthly_salary);
                setGender(record.data.employee.gender);
            }
        } catch (error) {
            toastr.error("Something went wrong");
            onClose();
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        // we add this code as an option to view and get the record without an API call
        //But for the sake of this exam, we will use api call, so the API for fetching will be used
        // if (employee && id) {
        //     setFname(employee.fname || "");
        //     setLname(employee.lname || "");
        //     setGender(employee.gender || "");
        //     setBdate("2002-07-16" || "");
        //     setSalary(employee.salary || "");
        // }
        if (id) {
            handleShow();
        }
    }, []);
    const handleSave = async () => {
        setLoader(true);
        const payload = {
            first_name: fname,
            last_name: lname,
            birthdate: bdate,
            gender: gender,
            monthly_salary: salary,
        };
        try {
            if (id) {
                const updatedData = await update(payload, id);
                if (updatedData) {
                    toastr.success("Employee has been updated", "Success");
                    await handleFetch();
                    onClose();
                }
            } else {
                const newData = await addNew(payload);
                if (newData) {
                    toastr.success("Employee has been added", "Success");
                    await handleFetch();
                    onClose();
                }
            }
        } catch (error) {
            console.log(error);
            toastr.error("Something went wrong", "Error");
        } finally {
            setLoader(false);
        }
    };

    return (
        <>
            <dialog id="save-modal" className="modal z-30" open>
                <div className="modal-box">
                    <form method="dialog">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={onClose}
                        >
                            ✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg pl-2">
                        {viewOnly
                            ? "Employee"
                            : id
                            ? "Update Employee"
                            : "Add New Employee"}
                    </h3>
                    <br />

                    <div className="mt-1">
                        <TextBox
                            value={fname}
                            label="First Name"
                            onChange={(e) => setFname(e.target.value)}
                            viewOnly={viewOnly}
                        ></TextBox>
                    </div>
                    <div className="mt-1">
                        <TextBox
                            value={lname}
                            label="Last Name"
                            onChange={(e) => setLname(e.target.value)}
                            viewOnly={viewOnly}
                        ></TextBox>
                    </div>
                    <div className="mt-1">
                        <SelectBox
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            label="Gender"
                            placeholder="Choose one"
                            options={["Male", "Female"]}
                            viewOnly={viewOnly}
                        ></SelectBox>
                    </div>
                    <div className="mt-1">
                        <DatePicker
                            value={bdate}
                            label="Birthdate"
                            onChange={(e) => setBdate(e.target.value)}
                            viewOnly={viewOnly}
                        ></DatePicker>
                    </div>
                    <div className="mt-1">
                        <NumBox
                            value={salary}
                            label="Monthly Salary"
                            onChange={(e) => setSalary(e.target.value)}
                            viewOnly={viewOnly}
                        ></NumBox>
                    </div>
                    <div className="modal-action justify-end">
                        {!viewOnly ? (
                            <>
                                <AppButton
                                    className="btn btn-ghost w-28"
                                    onClick={onClose}
                                >
                                    Cancel
                                </AppButton>
                                <AppButton
                                    className="btn btn-primary w-28"
                                    onClick={handleSave}
                                >
                                    Save
                                </AppButton>
                            </>
                        ) : (
                            <AppButton
                                className="btn btn-ghost w-28"
                                onClick={onClose}
                            >
                                Close
                            </AppButton>
                        )}
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default SaveModal;
