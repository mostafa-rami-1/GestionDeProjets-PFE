import React, { useState} from 'react'
import { useTranslation } from 'react-i18next'
import axiosClient from '../../../axios'
import MiniLoader from '../../loader/MiniLoader'
import LanguageModal from '../../modals/LanguageModal'

export default function SendEmailResetPassword() {
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [error, setError] = useState({ __html: "", __html2: "" })
    const handleSubmit = (ev) => {
        ev.preventDefault()
        setError({ __html: "", __html2: "" })
        setIsLoading(true)
        axiosClient.post("/forgot", {
            email,
        })
            .then(({ data }) => {
               console.log(data);
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
      <div className="mainContent">
          <div className="formContainer">
              <div><span>{t("entrez votre email")}</span></div>


              <form method="post" onSubmit={handleSubmit}>
                  {error.__html2 && <p className="error">{t(error.__html2)}</p>}
                  <input autoComplete="off" className="inpEmail" type="email" name="email" value={email}
                      placeholder={t("email")}
                      onChange={(ev) => setEmail(ev.target.value)} />
                  {error.__html ? <p className="error">{t(error.__html[0])}</p> : ""}


                  <div className="submit">
                      {isLoading ?
                          <MiniLoader />
                          :
                          <input type="submit" value={t("envoyer")} />
                      }
                  </div>

              </form>
          </div>
          <LanguageModal />
      </div>
  )
}
