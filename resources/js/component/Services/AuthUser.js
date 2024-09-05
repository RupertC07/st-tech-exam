import toastr from "toastr";
import "toastr/build/toastr.min.css";
import Joi from "joi";
import apiService from "./apiService";

// Validation schema using Joi
const validateUserAuth = (payload) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } }) // Disable TLD validation for demo purposes
            .required()
            .label("Email"),
        password: Joi.string().min(6).required().label("Password"),
    });
    return schema.validate(payload);
};

export const userAuth = async (payload, login, navigate) => {
    const token = "TestToken"; // Mock token for testing
    try {
        // Validate the form data
        const { error } = validateUserAuth(payload);
        if (error) {
            toastr.error(error.details[0].message, "Validation Error");
            return;
        }

        // // Simulated authentication check
        // if (payload.email === "test.dev@gmail.com") {
        //     login(token); // Call login function passed from the component
        //     navigate("/"); // Navigate to the dashboard
        //     toastr.success("Login successful!");
        // } else {
        //     toastr.error("Invalid login credentials");
        // }
        const auth = await apiService.post("/user/authenticate", payload);
        if (auth.status == 200) {
            login(auth.data.data.token);
            navigate("/");
            toastr.success("Login successful!");
        } else {
            toastr.error("Invalid login credentials");
        }
    } catch (err) {
        console.log(err);
        if (err.status == 401) {
            toastr.error("Invalid login credentials. Please try again");
        } else {
            toastr.error("Something went wrong.");
        }
    }
};

export const signout = async (logout, navigate) => {
    try {
        const response = await apiService.post("/user/signout");
        logout();
        navigate("/login");
    } catch (error) {
        toastr.error("Something went wrong.");
        logout();
        navigate("/login");
    }
};
