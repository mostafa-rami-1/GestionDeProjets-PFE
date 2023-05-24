import React, { useContext, useEffect, useState } from 'react'
import axiosClient from '../../../axios'
import { StateContext } from '../../../ContextProvider'
import {
    INPUT_LABEL, INPUT_STYLE, CLOSE_STYLE, MODIFY_STYLE, TEXTAREA, TEXTAREA_LABEL
} from './editMembre/inputStyle'

function EditDesignation() {
    const { editDesignationModalIsOpen, setEditDesignationModalIsOpen, idDesignation,refresh,setRefresh } = useContext(StateContext)
    const [error, setError] = useState({ nom: "", description: "" })
    const [nom, setNom] = useState("")
    const [description, setDescription] = useState("")
    const [id, setID] = useState(null)

    useEffect(() => {
        setID(idDesignation)
        if (id) {
            
            axiosClient.get(`/designations/${id}`).then((r) => {
                setNom(r.data.Designation.nom)
                setDescription(r.data.Designation.description)
            }).catch((e) => {
                console.log(e);
            })


        }
    }, [idDesignation, id])


    const handleSubmit = (e) => {
        e.preventDefault()
        setError({})
        axiosClient.patch(`/designations/${id}`, {
            nom, description
        }).then((response) => {
            setError({})
            setEditDesignationModalIsOpen(false)
            setRefresh(!refresh)
        }).catch((err) => {
            if (err.response.data.errors) {
                const { nom, description } = err.response.data.errors
                setError({ nom, description })
                console.log(err);
            }
            console.log(err);
        })
    }
    return (
        <div className={editDesignationModalIsOpen ? 'show' : 'hide'}>
            <form method='post' onSubmit={handleSubmit} >
                <div
                    className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">

                        <h5
                            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                            id="exampleModalLabel">
                            Modifier cette designation
                        </h5>

                        <button
                            onClick={() => setEditDesignationModalIsOpen(false)}
                            type="button"
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
                                value={nom}
                                className={INPUT_STYLE}
                                id="floatingNom09112081"
                                placeholder="nom"
                                onChange={(e) => setNom(e.target.value)}
                            />

                            <label
                                htmlFor="floatingNom09112081"
                                className={INPUT_LABEL}
                            >Nom</label>
                            {error.nom && <p className="error">{error.nom}</p>}
                        </div>

                        <div className="relative mb-3" data-te-input-wrapper-init>
                            <textarea
                                className={TEXTAREA}
                                id="exampleFormControlTextarea1091"
                                rows="3"
                                placeholder="Your message"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >

                            </textarea>
                            <label
                                htmlFor="exampleFormControlTextarea1091"
                                className={TEXTAREA_LABEL}
                            >Description</label
                            >
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
                                setEditDesignationModalIsOpen(false)
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
                            Modifier
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditDesignation