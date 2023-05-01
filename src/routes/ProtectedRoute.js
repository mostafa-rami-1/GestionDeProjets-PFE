import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom";

import { useIsAuthenticated} from 'react-auth-kit'
import { memo } from 'react';
const ProtectedRoute = ({ component: Component, loginPath, ...rest }) => {
  const isAuthenticated= useIsAuthenticated();
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated()) {
       navigate(loginPath)
  }
  },[isAuthenticated])
  
  return <Component {...rest} />;
};

export default memo(ProtectedRoute)