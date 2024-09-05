import React from "react";
import Joi from "joi";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const validateSave = (payload) => {
    const schema = Joi.object({
        fname: Joi.string().alphanum().min(3).max(30).required().messages({
            "string.base": `"First Name" should be a type of 'text'`,
            "string.empty": `"First Name" cannot be an empty field`,
            "string.min": `"First Name" should have a minimum length of {#limit}`,
            "string.max": `"First Name" should have a maximum length of {#limit}`,
            "any.required": `"First Name" is a required field`,
        }),

        lname: Joi.string().alphanum().min(3).max(30).required().messages({
            "string.base": `"Last Name" should be a type of 'text'`,
            "string.empty": `"Last Name" cannot be an empty field`,
            "string.min": `"Last Name" should have a minimum length of {#limit}`,
            "string.max": `"Last Name" should have a maximum length of {#limit}`,
            "any.required": `"Last Name" is a required field`,
        }),

        bdate: Joi.date().less("now").iso().messages({
            "date.base": `"Birth Date" should be a valid date`,
            "date.less": `"Birth Date" should be less than today's date`,
        }),

        gender: Joi.string().valid("Male", "Female").required().messages({
            "string.base": `"Gender" should be a type of 'text'`,
            "any.only": `"Gender" should be one of ['male', 'female', 'other']`,
            "any.required": `"Gender" is a required field`,
        }),

        salary: Joi.number().integer().min(0).messages({
            "number.base": `"Salary" should be a number`,
            "number.integer": `"Salary" should be an integer`,
            "number.min": `"Salary" should be a non-negative number`,
        }),
    });

    return schema.validate(payload);
};

export const addNew = async (payload, setLoader, onClose) => {
    try {
        const { error, value } = validateSave(payload);

        if (error) {
            toastr.error(error.details[0].message, "Validation Error");
            return;
        }
        setLoader(true);
        toastr.success("New empoyee has been added", "Success");
        setLoader(false);
        onClose();
        return value;
    } catch (error) {
        console.log(error);
        toastr.success("Something went wrong", "Error");
        setLoader(false);
    }
};

export const deleteEmployee = async (id, setLoader, onClose) => {
    try {
        setLoader(true);
        toastr.success("Employee has been removed", "Success");
        setLoader(false);
        onClose();
        return;
    } catch (error) {
        console.log(error);
        toastr.error("Something went wrong", "Error");
        setLoader(false);
    }
};

export const fetchAnalytics = async (setLoader) => {
    try {
        setLoader(true);

        const data = {
            male: 60,
            female: 40,
            averageAge: 27,
            totalMonthlySalary: 2234896,
        };

        return data;
    } catch (error) {
        toastr.error("Something went wrong", "Error");
    }
};
