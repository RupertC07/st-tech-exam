import React from "react";
import EmailField from "./inputs/email";
import PasswordField from "./inputs/password";
import AppButton from "../button";
import { useState } from "react";

import Joi from "joi";
import { userAuth } from "../../hooks/AuthUser";
import { useAuth } from "../../hooks/AuthContext";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setLoader }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        setIsLoading(true);
        const data = {
            email: email,
            password: password,
        };
        try {
            await userAuth(data, login, navigate);
        } catch (error) {}
        setIsLoading(false);
    };

    return (
        <div>
            <div className="text-center w-full">
                <EmailField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></EmailField>
            </div>
            <div className="text-center w-full pt-2">
                <PasswordField
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></PasswordField>
            </div>
            <div className="pt-6">
                <AppButton isLoading={isLoading} onClick={handleLogin}>
                    {isLoading ? (
                        <span className="loading loading-infinity loading-lg"></span>
                    ) : (
                        "Login"
                    )}
                </AppButton>
            </div>
        </div>
    );
};

export default LoginForm;
