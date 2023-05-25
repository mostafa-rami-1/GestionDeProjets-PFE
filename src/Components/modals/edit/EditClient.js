import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../../axios'
import { StateContext } from '../../../ContextProvider'
import {
    INPUT_LABEL, INPUT_STYLE, CLOSE_STYLE, MODIFY_STYLE
} from './editMembre/inputStyle'

export default function EditClient() {
    const { editClientModalIsOpen, setEditClientModalIsOpen, idClient, refresh, setRefresh,setIdClient } = useContext(StateContext)
    const [error, setError] = useState({ nom: "", prenom:"",email:"",telephone:"" })
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [id, setID] = useState(null)

    useEffect(() => {
        setID(idClient)
        if (id) {
            axiosClient.get(`/clients/${id}`).then((r) => {
                setNom(r.data.nom)
                setPrenom(r.data.prenom)
                setEmail(r.data.email)
                setTelephone(r.data.telephone)
            }).catch((e) => {
                console.log(e);
            })
        }
    }, [idClient, id])


    const handleSubmit = (e) => {
        e.preventDefault()
        setError({})
        axiosClient.patch(`/clients/${id}`, {
            nom, prenom,email,telephone
        }).then((response) => {
            setRefresh(!refresh)
            setError({})
            setEditClientModalIsOpen(false)
        }).catch((err) => {
            if (err.response.data.errors) {
                const { nom, email,telephone,prenom } = err.response.data.errors
                setError({ nom, email,prenom,telephone })
                console.log(err);
            }
            console.log(err);
        })
    }
  return (
      <div className={editClientModalIsOpen ? 'show ' : 'hide'}>
          <form method='post' onSubmit={handleSubmit} encType='multipart/form-data' className='lg:min-w-[500px]'>
              <div
                  className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex  flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 ">
                  <div
                      className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">

                      <h5
                          className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                          id="exampleModalLabel">
                          ajouter un client
                      </h5>

                      <button
                          type="button"
                          onClick={() => setEditClientModalIsOpen(false)}
                          className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                          data-te-modal-dismiss
                          aria-label="Close">
                          <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-6 w-6">
                              <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      </button>
                  </div>


                  <div data-te-modal-body-ref className="relative p-4">


                      <div className="relative mb-3">
                          <input
                              type="text"
                              value={prenom}
                              className={INPUT_STYLE}
                              id="floatingPrenom99ß9))"
                              placeholder="Prenom"
                              onChange={(e) => setPrenom(e.target.value)}
                          />

                          <label
                              htmlFor="floatingPrenom99ß9))"
                              className={INPUT_LABEL}
                          >Prenom</label>
                          {error.prenom && <p className="error">{error.prenom}</p>}
                      </div>

                      <div className="relative mb-3">
                          <input
                              type="text"
                              value={nom}
                              className={INPUT_STYLE}
                              id="floatingNom99ß011//"
                              placeholder="nom"
                              onChange={(e) => setNom(e.target.value)}
                          />

                          <label
                              htmlFor="floatingNom99ß011//"
                              className={INPUT_LABEL}
                          >Nom</label>
                          {error.nom && <p className="error">{error.nom}</p>}

                      </div>
                      <div className="relative mb-3">
                          <input
                              type="email"
                              value={email}
                              className={INPUT_STYLE}
                              id="floatingInput99=%}8"
                              placeholder="name@example.com"
                              onChange={(e) => setEmail(e.target.value)}
                          />
                          <label
                              htmlFor="floatingInput99=%}8"
                              className={INPUT_LABEL}
                          >Email address</label>
                          {error.email && <p className="error">{error.email}</p>}

                      </div>

                      <div className="relative mb-3">
                          <input
                              type="tel"
                              value={telephone}
                              className={INPUT_STYLE}
                              id="floatingTelephone99ß112$§"
                              placeholder="telephone"
                              onChange={(e) => setTelephone(e.target.value)}
                          />

                          <label
                              htmlFor="floatingTelephone99ß112$§"
                              className={INPUT_LABEL}
                          >Telephone</label>
                          {error.telephone && <p className="error">{error.telephone}</p>}

                      </div>
                  </div>
                  <div
                      className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                      <button
                          type="button"
                          className={CLOSE_STYLE}
                          data-te-modal-dismiss
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          onClick={() => {
                              setIdClient(null)

                              setError({})

                              setEditClientModalIsOpen(false)
                          }}
                      >
                          Close

                      </button>
                      <button
                          type="button"
                          className={MODIFY_STYLE}
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          onClick={handleSubmit}
                      >
                          modifier
                      </button>
                  </div>
              </div>
          </form>
      </div>
  )
}
