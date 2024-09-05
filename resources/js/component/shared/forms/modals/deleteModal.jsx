import React, { useEffect, useState } from "react";
import AppButton from "../../button";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { DatePicker, NumBox, SelectBox, TextBox } from "../inputs/input";
import { addNew, deleteEmployee } from "../../../hooks/Employee";

const DeleteModal = ({ id, setLoader, onClose, handleFetch, name }) => {
    const handleSave = async () => {
        try {
            await deleteEmployee(id, setLoader, onClose);
        } catch (error) {
            toastr.error("Something went wrong.", "Error");
        } finally {
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
                    <h3 className="font-bold text-lg pl-2">Delete Employee</h3>
                    <br />

                    <div className="mt-1">
                        <p className="p-2 text-center text-lg text-danger">
                            Are you sure you want to remove {name}'s record?
                        </p>
                        <p className="text-accent text-center text-sm">
                            You can't recover it once deleted.
                        </p>
                    </div>

                    <div className="modal-action justify-end">
                        <AppButton
                            className="btn btn-ghost w-28"
                            onClick={onClose}
                        >
                            Cancel
                        </AppButton>
                        <AppButton
                            className="btn btn-primary w-28 bg-danger"
                            onClick={handleSave}
                        >
                            Confirm
                        </AppButton>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default DeleteModal;
