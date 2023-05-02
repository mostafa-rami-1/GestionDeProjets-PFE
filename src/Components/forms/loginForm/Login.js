
import React,{useState,useContext, memo } from "react";

import { useTranslation } from "react-i18next";
import axiosClient from "../../../axios";
import {  useSignIn } from 'react-auth-kit'
import "./login.css"
import { StateContext } from "../../../ContextProvider";
import MiniLoader from "../../loader/MiniLoader";


const LoginForm = () => {
  const {refresh ,setRefresh} = useContext(StateContext)
    const signIn = useSignIn()
    const { t } = useTranslation()
    const [isLoading , setIsLoading] = useState(false)
    const [email,setEmail]= useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({ __html: "" , __html2: "" })
    
    const handleSubmit = (ev) => {
        ev.preventDefault()
        setError({ __html: "" , __html2: "" })
        setIsLoading(true)
        axiosClient.post("/login", {
            email,
            password
        })
        .then(({ data }) => {
            signIn({
                token: data.token,
                authState: data.user,
                expiresIn: 3600,
                tokenType:"Bearer",
            })
            localStorage.setItem("currentUser",JSON.stringify( data.user))
            localStorage.setItem("role",data.user.role.nom)
            setRefresh(!refresh)
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.data.errors) {
                    const htmlErrors = Object.values(error.response?.data?.errors).reduce((prev, next) => {
                        return [...prev,...next]
                    }, [])
                    setError({__html: htmlErrors})
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

    return(
        <form method="post" onSubmit={handleSubmit}>
            {error.__html2 && <p className="error">{t(error.__html2)}</p>}
            <input autoComplete="off" className="inpEmail" type="email" name="email" value={email}
                placeholder={t("email")}
                onChange={(ev) => setEmail(ev.target.value)} />
            {error.__html?<p className="error">{t(error.__html[0])}</p>:""}
         
            <input autoComplete="off" className="inpPassword" type="password" name="password" value={password}
                placeholder={t("mot de passe")}
                onChange={(ev) => setPassword(ev.target.value)} />
             {error.__html?<p className="error">{t(error.__html[1])}</p>:""}
          
            <div  className="submit">
                {isLoading ?
                   <MiniLoader/>
                    :
                    <input type="submit" value={t("s'identifier")} />
                 }
               
            </div>
        </form>
    )
}
export default memo(LoginForm)