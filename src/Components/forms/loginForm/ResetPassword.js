import React, { useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router-dom'
import axiosClient from '../../../axios'
import MiniLoader from '../../loader/MiniLoader'
import LanguageModal from '../../modals/LanguageModal'
import MessageApi from '../../modals/message/Message'

export default function ResetPassword() {
  const { token } = useParams()
  const [msg, setMsg] = useState("")
  const [success, setSuccess] = useState(false)

  
  console.log(token);
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [error, setError] = useState({ __html: "", __html2: "" })
  const handleSubmit = (ev) => {
    ev.preventDefault()
    setError({ __html: "", __html2: "" })
    setIsLoading(true)
    axiosClient.post("/reset", {
      token,
      password,
      "password_confirmation": confirmedPassword
    })
      .then(({ data }) => {
        setSuccess(true)
        setMsg(data.message)
       setTimeout(() => {
         window.location.pathname = "/login"
       }, 800);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data.errors) {
            const htmlErrors = Object.values(error.response?.data?.errors).reduce((prev, next) => {
              return [...prev, ...next]
            }, [])
            setError({ __html: htmlErrors })
            throw htmlErrors
          }
          if (error.response.data.error) {
            setError({ __html2: error.response.data.error })
          }
          throw error
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <>
      
      {msg ? (<div className=" h-screen w-screen min-w-[100vw] min-h-[100vh] flex justify-center align-middle">
        <div className="edit-center-loading" >
          < MessageApi msg={msg} success={success} />
        </div >
      </div>) :
        (<div className="mainContent">
          <div className="formContainer">
            <div><span>{t("changer votre mot de passe")}</span></div>
            <form method="post" onSubmit={handleSubmit}>
              {error.__html2 && <p className="error">{t(error.__html2)}</p>}
              <input autoComplete="off" className="inpPassword" type="password" name="password" value={password}
                placeholder={t("mot de passe")}
                onChange={(ev) => setPassword(ev.target.value)} />
              {error.__html ? <p className="error">{t(error.__html[0])}</p> : ""}

              <input autoComplete="off" className="inpPassword" type="password" name="password" value={confirmedPassword}
                placeholder={t("mot de passe")}
                onChange={(ev) => setConfirmedPassword(ev.target.value)} />
              {error.__html ? <p className="error">{t(error.__html[1])}</p> : ""}

              <div className="submit">
                {isLoading ?
                  <MiniLoader />
                  :
                  <input type="submit" value={t("changer")} />
                }
              </div>

            </form>
          </div>
          <LanguageModal />
        </div>)
      }
    </>
    
  )

  
}
