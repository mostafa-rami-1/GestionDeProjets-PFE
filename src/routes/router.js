import React from 'react'
import Login  from "../Components/login/Login"
import { createBrowserRouter, Navigate } from "react-router-dom"
import Dashboard  from "../Components/dashboard/Dashboard"
import Members  from "../Components/members/Members"
import Categories  from "../Components/categories/Categories"
import Reports from "../Components/reports/Reports"
import Tasks from "../Components/tasks/Tasks"
import Projects from "../Components/projects/Projects"
import Designations from "../Components/designations/Designations"
import Home from "../home/Home";
import { Test } from "../Test";
import ProtectedLoginRoute from './ProtectedLoginRoute'
import ProtectedRoute from './ProtectedRoute'
import Clients from '../Components/clients/Clients'




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
        path: "/reports",
        element: (
          <ProtectedRoute component={Reports} loginPath="/login" />
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <ProtectedLoginRoute component={Login} redirectTo="/dashboard" />,
  },
  {
    path: "/test",
    element: <Test/>,
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router