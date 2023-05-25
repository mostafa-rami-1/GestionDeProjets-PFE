import React, { useContext, useState } from 'react'
import axiosClient from '../../../axios'
import { StateContext } from '../../../ContextProvider'
import {
    INPUT_LABEL, INPUT_STYLE, CLOSE_STYLE, MODIFY_STYLE, TEXTAREA, TEXTAREA_LABEL
} from '../edit/editMembre/inputStyle'

function AddDesignation() {
    const { editModalIsOpen, setEditModalIsOpen,setRefresh,refresh } = useContext(StateContext)
    const [error, setError] = useState({ nom: "", description: "" })
    const [nom, setNom] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        setError({})
        axiosClient.post(`/designations`, {
            nom, description
        }).then((response) => {
            setError({})
            setEditModalIsOpen(false)
            setRefresh(!refresh)
            setNom("")
            setDescription("")
        }).catch((err) => {
            if (err.response.data.errors) {
                const { nom, description } = err.response.data.errors
                setError({ nom, description })
            }
            console.log(err);
        })
    }
    return (
        <div className={editModalIsOpen ? 'show' : 'hide'}>
            <form method='post' onSubmit={handleSubmit} className='lg:min-w-[500px]' >
                <div
                    className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">

                        <h5
                            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                            id="exampleModalLabel">
                            Ajouter une designation
                        </h5>

                        <button
                            onClick={() => setEditModalIsOpen(false)}
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
                                id="floatingNom0911209091"
                                placeholder="nom"
                                onChange={(e) => setNom(e.target.value)}
                            />

                            <label
                                htmlFor="floatingNom0911209091"
                                className={INPUT_LABEL}
                            >Nom</label>
                            {error.nom && <p className="error">{error.nom}</p>}
                        </div>

                        <div className="relative mb-3" data-te-input-wrapper-init>
                            <textarea
                                className={TEXTAREA}
                                id="0lss091"
                                rows="3"
                                placeholder="Your message"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >

                            </textarea>
                            <label
                                htmlFor="0lss091"
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
                                setEditModalIsOpen(false)
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
                            Ajouter
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddDesignation