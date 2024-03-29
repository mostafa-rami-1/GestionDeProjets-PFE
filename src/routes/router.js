import React from 'react'
import Login  from "../Components/login/Login"
import { createBrowserRouter, Navigate } from "react-router-dom"
import Dashboard  from "../Components/dashboard/Dashboard"
import Members  from "../Components/members/Members"
import Categories  from "../Components/categories/Categories"
import Tasks from "../Components/tasks/Tasks"
import Projects from "../Components/projects/Projects"
import Designations from "../Components/designations/Designations"
import Home from "../home/Home";
import { Test } from "../Test";
import ProtectedLoginRoute from './ProtectedLoginRoute'
import ProtectedRoute from './ProtectedRoute'
import Clients from '../Components/clients/Clients'
import SendEmailResetPassword from '../Components/forms/loginForm/SendEmailResetPassword'
import ResetPassword from '../Components/forms/loginForm/ResetPassword'




const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute component={Dashboard} loginPath="/login" />
        ),
      },
      {
        path: "/members",
        element: (
          <ProtectedRoute component={Members} loginPath="/login" />
        ),
      },
      {
        path: "/projects",
        element: (
          <ProtectedRoute component={Projects} loginPath="/login" />
        ),
      },
      {
        path: "/tasks",
        element: <ProtectedRoute component={Tasks} loginPath="/login" />,
      },
      {
        path: "/designations",
        element: (
          <ProtectedRoute component={Designations} loginPath="/login" />
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute component={Categories} loginPath="/login" />
        ),
      },
      {
        path: "/designations",
        element: (
          <ProtectedRoute component={Designations} loginPath="/login" />
        ),
      },
      {
        path: "/clients",
        element: (
          <ProtectedRoute component={Clients} loginPath="/login" />
        ),
      },
      
      {
        path: "/test",
        element: <Test />,
      },
    ],
  },
  {
    path: "/login",
    element: <ProtectedLoginRoute component={Login} redirectTo="/dashboard" />,
  },
  {
    path: "/send_reset",
    element: <ProtectedLoginRoute component={SendEmailResetPassword} redirectTo="/login" />,
  },
  {
    path: "/reset/:token",
    element: <ProtectedLoginRoute component={ResetPassword} redirectTo="/login" />,
  },
  
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router