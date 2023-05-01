import React, { useEffect,useContext } from 'react'
import {useNavigate} from "react-router-dom";
import { useIsAuthenticated} from 'react-auth-kit'
import { StateContext } from '../ContextProvider';
import { memo } from 'react';

const ProtectedLoginRoute = ({ component: Component, redirectTo, ...rest }) => {
  const isAuthenticated = useIsAuthenticated();
  const {refresh} = useContext(StateContext)
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated()) {
        navigate(redirectTo)
    }
  },[refresh])
  return  <Component {...rest} />;
};
export default memo(ProtectedLoginRoute)