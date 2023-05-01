import i18next from 'i18next'
import React, {useContext,useEffect} from 'react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate } from 'react-router-dom'
import {StateContext} from '../../ContextProvider'
import { pageDirConfig } from '../../lang/pageDirConfig'
import LoginForm from "../forms/loginForm/Login"
import LanguageModal from "../modals/LanguageModal"
import "./login.css"
const Login = () => {
  const {t}=  useTranslation()
    useEffect(() => {
      pageDirConfig(i18next.dir())
    }, [t])
  return (
    <div className="mainContent">
      <div className="formContainer">
        <div><span>{t("Login") }</span></div>
        <LoginForm />
      </div>
      <LanguageModal/>
    </div>
  )
}
export default memo(Login)