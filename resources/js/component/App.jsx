// resources/js/App.jsx

import React from "react";
import { Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./hooks/AuthContext";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const App = () => {
    return (
        <div className="bg-neutral min-h-screen h-full w-full overflow-x-hidden ">
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </div>
    );
};

export default App;
