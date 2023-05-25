import React, { useContext, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './delete.css'
import { StateContext } from '../../../ContextProvider'
import axiosClient from '../../../axios'
import MiniLoader from '../../loader/MiniLoader'

export default function DeleteClient() {
    const { deleteClientModalIsOpen, setDeleteClientModalIsOpen, idClient, refresh, setRefresh } = useContext(StateContext)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const deleteClientRef = useRef(null)
    const process = (id) => {
        deleteClientRef.current.className = "hide"
        setLoading(true)
        axiosClient.delete(`/clients/${id}`)
            .then((response) => {
                setLoading(false)
                setMessage(response.data.message)
                setRefresh(!refresh)
            }
            ).catch((error) => { console.log(error); })
    }
    const annuler = () => {
        setDeleteClientModalIsOpen(false)
    }
    const { t } = useTranslation()
  return (
      <div className={deleteClientModalIsOpen ? 'show' : 'hide'}>
          <div className='delete-modal'>
              <div ref={deleteClientRef} className="actions-delete">
                  <p>{t('voulez vous vraiment supprimer? ')}</p>
                  <div className="actions-delete-btns">
                      <button onClick={annuler} id="annuler-btn">Annuler</button>
                      <button onClick={() => process(idClient)} id="delete-btn">Oui</button>
                  </div>
              </div>
              <center>{loading && <MiniLoader />}
                  {message &&
                      <>
                          <p id='delete-message'>{message}</p>
                          <button id='ok-delete' onClick={() => {
                              setDeleteClientModalIsOpen(false)
                              setMessage("")
                              deleteClientRef.current.className = "actions-delete"
                          }}>OK</button>
                      </>
                  }

              </center>
          </div>
      </div>
  )
}
