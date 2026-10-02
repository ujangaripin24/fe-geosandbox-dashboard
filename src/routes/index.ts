import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import React from "react";
import ComponentUIPage from "../pages/ComponentUIPage/ComponentUIPage";
import Layout from "../components/ui/Layout";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import { ProtectedRoute } from "../components/ui/AuthGuards";

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
    },
    {
        path: '/template-ui',
        element: React.createElement(ComponentUIPage)
    },
    {
        element: React.createElement(ProtectedRoute),
        children: [
            {
                path: '/dashboard',
                element: React.createElement(Layout),
                children: [
                    {
                        index: true,
                        element: React.createElement(DashboardPage)
                    }
                ]
            }
        ]
    }
])