import React, { useEffect } from "react";
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
import { fetchEmployees } from "../Services/Employee";
import Search from "./forms/inputs/search";
import { TfiReload } from "react-icons/tfi";
import Pagination from "./pagination";

const EmployeeTable = ({ setLoader }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const [viewOnly, setViewOnly] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [employee, setEmployee] = useState({});
    const [query, setQuery] = useState("");
    const [pagination, setPagination] = useState({});
    const [employeeName, setEmployeeName] = useState("");

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

    const handleDelete = (id, name) => {
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
        setEmployeeName(name);
    };

    const handleSearch = async () => {
        try {
            if (query) {
                await handleFetch(query);
            }
            return;
        } catch (error) {
            toastr.error("Something went wrong");
        }
    };

    const handleReload = async () => {
        try {
            await handleFetch();
            setQuery("");
        } catch (error) {
            toastr.error("Something went wrong");
        }
    };

    const handlePaginate = async (page) => {
        await handleFetch(query != "" ? query : null, page);
    };

    const handleFetch = async (search = null, page = 1) => {
        try {
            setLoader(true);
            const record = await fetchEmployees(search, page);
            if (record) {
                setEmployees(record.data.data);
                setPagination(record.data.pagination);
            }
        } catch (error) {
            toastr.error("Something went wrong");
        } finally {
            // console.log(employees);
            setLoader(false);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        <div>
            <div className="px-6 py-10">
                <div className="card card-compact bg-base-100 w-full shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">
                            <b>Employees</b>
                        </h2>
                        <div>
                            <div className="py-2 flex justify-between">
                                <div>
                                    <div className="flex justify-between gap-2">
                                        <div>
                                            {" "}
                                            <Search
                                                value={query}
                                                onChange={(e) =>
                                                    setQuery(e.target.value)
                                                }
                                                className={"grow w-96"}
                                            ></Search>
                                        </div>

                                        <div>
                                            <AppButton
                                                onClick={handleSearch}
                                                isLoading={false}
                                                className="btn btn-secondary"
                                            >
                                                Search
                                            </AppButton>
                                        </div>
                                        <div>
                                            <AppButton
                                                onClick={handleReload}
                                                isLoading={false}
                                                className="btn btn-ghost"
                                            >
                                                <TfiReload />
                                            </AppButton>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {" "}
                                    <AppButton
                                        className={"btn btn-primary font-bold"}
                                        onClick={() => handleOpenModal(null)}
                                    >
                                        <IoMdPersonAdd /> New Employee
                                    </AppButton>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="table">
                                    {/* head */}
                                    <thead>
                                        <tr>
                                            <th className="w-1/4">Name</th>
                                            <th className="text-center w-1/4">
                                                Birthdate
                                            </th>
                                            <th className="text-center w-1/4">
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
                                                                        employee.first_name
                                                                    }{" "}
                                                                    {
                                                                        employee.last_name
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
                                                    <td className="text-center">
                                                        {employee.birthdate}
                                                    </td>
                                                    <td className="text-center">
                                                        {parseInt(
                                                            employee.monthly_salary
                                                        ).toLocaleString()}
                                                    </td>
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
                                                                    employee.id,

                                                                    `${employee.first_name} ${employee.last_name}  `
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

                            <div className="flex justify-center p-6">
                                <Pagination
                                    currentpage={pagination.current}
                                    next={pagination.next}
                                    prev={pagination.previous}
                                    handlePaginate={handlePaginate}
                                ></Pagination>
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
                    name={employeeName}
                    id={employeeId}
                    setLoader={setLoader}
                    onClose={() => setDeleteOpen(false)}
                />
            )}
        </div>
    );
};

export default EmployeeTable;
