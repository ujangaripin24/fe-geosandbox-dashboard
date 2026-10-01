import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import React from "react";

export const router = createBrowserRouter([
    {
        path: '/',
        element: React.createElement(HomePage)
    },
    {
        path: '/login',
        element: React.createElement(LoginPage)
    },
    {
        path: '/register',
        element: React.createElement(RegisterPage)
    }
])