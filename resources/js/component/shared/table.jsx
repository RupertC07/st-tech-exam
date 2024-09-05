import React from "react";
import { useState } from "react";
import AppButton from "./button";
// import user from "../../../assets/user";
import SaveModal from "./forms/modals/saveModal";
import { IoMdPersonAdd } from "react-icons/io";
import { FaTrashAlt, FaPencilAlt, FaEye } from "react-icons/fa";
import user from "../../../assets/user.png";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import DeleteModal from "./forms/modals/deleteModal";

const EmployeeTable = ({ setLoader }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const [viewOnly, setViewOnly] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({});

    const handleOpenModal = (id, viewOnly = false) => {
        if (id) {
            const employee = employees.find((emp) => {
                return id == emp.id;
            });

            if (employee) {
                setEmployee(employee);
            } else {
                toastr.error("Something went wrong", "Error");
                return;
            }
        }
        setEmployeeId(id);
        setModalOpen(true);
        setViewOnly(viewOnly);
    };

    const handleDelete = (id) => {
        const employee = employees.find((emp) => {
            return id == emp.id;
        });

        if (employee) {
            setEmployee(employee);
        } else {
            toastr.error("Something went wrong", "Error");
            return;
        }

        setEmployeeId(id);
        setDeleteOpen(true);
    };

    const handleFetch = async () => {
        try {
            setEmployees([
                {
                    id: 1,
                    fname: "Rupert",
                    lname: "Caingal",
                    gender: "Male",
                    bdate: "2002/07/16",
                    salary: 1000,
                },
            ]);
        } catch (error) {
        } finally {
            console.log(employees);
        }
    };

    return (
        <div>
            <div className="px-6 py-10">
                <div className="card card-compact bg-base-100 w-full shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">
                            <b>Employees</b>
                        </h2>
                        <div>
                            <div className="py-2 flex justify-end">
                                {" "}
                                <AppButton
                                    className={"btn btn-primary font-bold"}
                                    onClick={() => handleOpenModal(null)}
                                >
                                    <IoMdPersonAdd /> New Employee
                                </AppButton>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th className="w-1/4">Name</th>
                                            <th className="w-1/4">Birthdate</th>
                                            <th className="w-1/4">
                                                Monthly Salary
                                            </th>
                                            <th className="w-1/4 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                            <td
                                                colSpan={4}
                                                className="text-center text-zinc-500"
                                            >
                                                No employee available
                                            </td>
                                        </tr> */}
                                        {/* row 1 */}
                                        {employees.length > 0 ? (
                                            employees.map((employee, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="flex items-center gap-3">
                                                            <div className="avatar">
                                                                <div className="mask mask-squircle h-12 w-12">
                                                                    <img
                                                                        src={
                                                                            user
                                                                        }
                                                                        alt="Avatar"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="font-bold">
                                                                    {
                                                                        employee.fname
                                                                    }{" "}
                                                                    {
                                                                        employee.lname
                                                                    }
                                                                </div>
                                                                <div className="text-sm opacity-50">
                                                                    {
                                                                        employee.gender
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{employee.bdate}</td>
                                                    <td>{employee.salary}</td>
                                                    <td className="text-center">
                                                        <AppButton
                                                            className={
                                                                "btn btn-ghost"
                                                            }
                                                            onClick={() =>
                                                                handleOpenModal(
                                                                    employee.id,
                                                                    true
                                                                )
                                                            }
                                                        >
                                                            <FaEye />
                                                        </AppButton>
                                                        <AppButton
                                                            className={
                                                                "btn btn-ghost"
                                                            }
                                                            onClick={() =>
                                                                handleOpenModal(
                                                                    employee.id
                                                                )
                                                            }
                                                        >
                                                            <FaPencilAlt />
                                                        </AppButton>

                                                        <AppButton
                                                            className={
                                                                "btn btn-ghost"
                                                            }
                                                            onClick={() =>
                                                                handleDelete(
                                                                    employee.id
                                                                )
                                                            }
                                                        >
                                                            <FaTrashAlt />
                                                        </AppButton>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan={4}
                                                    className="text-center text-zinc-500"
                                                >
                                                    No employee available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    {/* foot */}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <SaveModal
                    employee={employee}
                    viewOnly={viewOnly}
                    id={employeeId}
                    setLoader={setLoader}
                    onClose={() => setModalOpen(false)}
                    handleFetch={handleFetch}
                />
            )}
            {deleteOpen && (
                <DeleteModal
                    handleFetch={handleFetch}
                    name={"rupert"}
                    id={1}
                    setLoader={setLoader}
                    onClose={() => setDeleteOpen(false)}
                />
            )}
        </div>
    );
};

export default EmployeeTable;
