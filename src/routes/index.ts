import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import React from "react";
import ComponentUIPage from "../pages/ComponentUIPage/ComponentUIPage";
import Layout from "../components/ui/Layout";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import { ProtectedRoute } from "../components/ui/AuthGuards";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: React.createElement(HomePage),
        handle: { title: "Home" } // <--- Tambahkan handle.title
    },
    {
        path: '/login',
        element: React.createElement(LoginPage),
        handle: { title: "Login" }
    },
    {
        path: '/register',
        element: React.createElement(RegisterPage),
        handle: { title: "Register" }
    },
    {
        path: '/template-ui',
        element: React.createElement(ComponentUIPage),
        handle: { title: "UI Components" }
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
                        element: React.createElement(DashboardPage),
                        handle: { title: "Dashboard" } // <--- Untuk rute index
                    },
                    {
                        path: 'profile',
                        element: React.createElement(ProfilePage),
                        handle: { title: "User Profile" }
                    }
                ]
            }
        ]
    }
]);
