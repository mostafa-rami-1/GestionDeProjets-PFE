import React, { useContext, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import './delete.css'
import { StateContext } from '../../../ContextProvider'
import axiosClient from '../../../axios'
import MiniLoader from '../../loader/MiniLoader'
const DeleteDesignation = () => {
    const { deleteModaIsOpen, setDeleteModalIsOpen, idDesignation, refresh, setRefresh } = useContext(StateContext)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const deleteDesignationRef = useRef(null)
    const process = (id) => {
        deleteDesignationRef.current.className = "hide"
        setLoading(true)
        axiosClient.delete(`/designations/${id}`)
            .then((response) => {
                setLoading(false)
                setMessage(response.data.message)
                setRefresh(!refresh)
            }
            ).catch((error) => { console.log(error); })
    }
    const annuler = () => {
        setDeleteModalIsOpen(false)
    }
    const { t } = useTranslation()
    return (
        <div className={deleteModaIsOpen ? 'show' : 'hide'}>
            <div className='delete-modal'>
                <div ref={deleteDesignationRef} className="actions-delete">
                    <p>{t('voulez vous vraiment supprimer? ')}</p>
                    <div className="actions-delete-btns">
                        <button onClick={annuler} id="annuler-btn">Annuler</button>
                        <button onClick={() => process(idDesignation)} id="delete-btn">Oui</button>
                    </div>
                </div>
                <center>{loading && <MiniLoader />}
                    {message &&
                        <>
                            <p id='delete-message'>{message}</p>
                            <button id='ok-delete' onClick={() => {
                                setDeleteModalIsOpen(false)
                                setMessage("")
                                deleteDesignationRef.current.className = "actions-delete"
                            }}>OK</button>
                        </>
                    }

                </center>
            </div>
        </div>
    )
}

export default DeleteDesignation
