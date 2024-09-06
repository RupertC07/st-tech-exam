import React from "react";
import Joi from "joi";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import apiService from "./apiService";

const validateSave = (payload) => {
    const schema = Joi.object({
        first_name: Joi.string().alphanum().min(3).max(30).required().messages({
            "string.base": `"First Name" should be a type of 'text'`,
            "string.empty": `"First Name" cannot be an empty field`,
            "string.min": `"First Name" should have a minimum length of {#limit}`,
            "string.max": `"First Name" should have a maximum length of {#limit}`,
            "any.required": `"First Name" is a required field`,
        }),

        last_name: Joi.string().alphanum().min(3).max(30).required().messages({
            "string.base": `"Last Name" should be a type of 'text'`,
            "string.empty": `"Last Name" cannot be an empty field`,
            "string.min": `"Last Name" should have a minimum length of {#limit}`,
            "string.max": `"Last Name" should have a maximum length of {#limit}`,
            "any.required": `"Last Name" is a required field`,
        }),

        birthdate: Joi.date().less("now").iso().messages({
            "date.base": `"Birth Date" should be a valid date`,
            "date.less": `"Birth Date" should be less than today's date`,
        }),

        gender: Joi.string().valid("Male", "Female").required().messages({
            "string.base": `"Gender" should be a type of 'text'`,
            "any.only": `"Gender" should be one of ['male', 'female', 'other']`,
            "any.required": `"Gender" is a required field`,
        }),

        monthly_salary: Joi.number().integer().min(0).messages({
            "number.base": `"Salary" should be a number`,
            "number.integer": `"Salary" should be an integer`,
            "number.min": `"Salary" should be a non-negative number`,
        }),
    });

    return schema.validate(payload);
};

export const addNew = async (payload) => {
    const { error, value } = validateSave(payload);

    if (error) {
        toastr.error(error.details[0].message, "Validation Error");
        return;
    }

    const response = await apiService.post("/employee", payload);
    if (response.status == 200) {
        return response;
    }
    return null;
};

export const update = async (payload, id) => {
    const { error, value } = validateSave(payload);

    if (error) {
        toastr.error(error.details[0].message, "Validation Error");
        return;
    }

    const response = await apiService.put(`/employee/${id}`, payload);
    if (response.status == 200) {
        return response;
    }
    return null;
};

export const deleteEmployee = async (id) => {
    const response = await apiService.delete(`/employee/${id}`);
    if (response.status == 200) {
        return true;
    }

    return false;
};

export const fetchAnalytics = async () => {
    const response = await apiService.get("/analytics/employee");
    if (response.status == 200) {
        // console.log(response);

        const data = {
            male: response.data.data.summary.maleCount,
            female: response.data.data.summary.femaleCount,
            averageAge: response.data.data.summary.ageStats.average_age,
            lowAge: response.data.data.summary.ageStats.min,
            highAge: response.data.data.summary.ageStats.max,
            totalMonthlySalary: response.data.data.summary.totalSalary,
            averageMonhtlySalary: response.data.data.summary.averageSalary,
        };
        return data;
    }
    return null;
};

export const fetchEmployees = async (search = null, page = 1) => {
    let url = `/employee?page=${page}`;

    url = search ? `${url}&search=${search}` : url;

    const response = await apiService.get(url);
    if (response.status == 200) {
        // console.log(response);
        return response.data;
    }
    return null;
};

export const fetchEmployee = async (id) => {
    const response = await apiService.get(`/employee/${id}`);
    if (response.status == 200) {
        // console.log(response);
        return response.data;
    }
    return null;
};
