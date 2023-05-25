import React, { useContext, useEffect, useRef, useState } from 'react'
import axiosClient from '../../../axios'
import { StateContext } from '../../../ContextProvider'
import {
    INPUT_LABEL, INPUT_STYLE, CLOSE_STYLE, MODIFY_STYLE, FILE_INPUT_STYLE, RADIO_STYLE
} from '../edit/editMembre/inputStyle'
import roles from '../edit/editMembre/roles'


import { Select, initTE } from "tw-elements";
export default function AddMember() {
    const { idMembre, setMembre, setIdMembre, designations, editModalIsOpen, setEditModalIsOpen,setDesignations,isMembersFetched,setIsMembersFetched } = useContext(StateContext)
    const [id, setId] = useState(null)

    const [error, setError] = useState({ nom: "", prenom: "", email: "", telephone: "", password: "", password_confirmation: "", image: "", role: "" })

    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [designation, setDesignation] = useState(null)
    const [password, setPassword] = useState("")
    const [password_confirmation, setPassword_confirmation] = useState("")
    const [image, setImage] = useState(null)
    const [role, setRole] = useState(null)
    const roleRef = useRef([])
    const designationRef = useRef([])


    useEffect(() => {
        setId(idMembre)
       
            initTE({ Select });
            
        if (designations.length <= 0) {
            axiosClient.get("/designations").then((r) => {
                setDesignations(r.data)

            }).catch((e) => {
                console.log(e);
            })
            }
    }, [idMembre, id])

    
    



    const handleSubmit = (e) => {
        e.preventDefault();        
        setError({})
        const data = new FormData()
        data.append("image", image)
        data.append("nom", nom)
        data.append("prenom", prenom)
        data.append("email", email)
        data.append("telephone", telephone)
        data.append("password", password)
        data.append("password_confirmation", password_confirmation)
        data.append("id_role", role)
        data.append("id_designation", designation)
        data.append("_method", "post")
        axiosClient.post(`/membres`, data).then((response) => {
            setError({})
            setIdMembre(null)
            setIsMembersFetched(!isMembersFetched)
            setEditModalIsOpen(false)
        }).catch((err) => {
            if (err.response.data.errors) {
                const { nom, prenom, email, telephone, password, image, id_role } = err.response.data.errors
                setError({ nom, prenom, email, password, telephone, image, role: id_role })
                throw err.response.data.errors
            }
        })
    }


    return (
            <div className={editModalIsOpen?'show':'hide'}>
            <form className='scale-70' method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
                <div
                    className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">

                        <h5
                            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                            id="exampleModalLabel">
                            ajouter un membre
                        </h5>

                        <button
                            type="button"
                            onClick={() => setEditModalIsOpen(false)}
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
                                id="floatingPrenom99"
                                placeholder="Prenom"
                                onChange={(e) => setPrenom(e.target.value)}
                            />

                            <label
                                htmlFor="floatingPrenom99"
                                className={INPUT_LABEL}
                            >Prenom</label>
                            {error.prenom && <p className="error">{error.prenom}</p>}


                        </div>

                        <div className="relative mb-3">
                            <input
                                type="text"
                                value={nom}
                                className={INPUT_STYLE}
                                id="floatingNom99"
                                placeholder="nom"
                                onChange={(e) => setNom(e.target.value)}
                            />

                            <label
                                htmlFor="floatingNom99"
                                className={INPUT_LABEL}
                            >Nom</label>
                            {error.nom && <p className="error">{error.nom}</p>}

                        </div>
                        <div className="relative mb-3">
                            <input
                                type="email"
                                value={email}
                                className={INPUT_STYLE}
                                id="floatingInput99"
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label
                                htmlFor="floatingInput99"
                                className={INPUT_LABEL}
                            >Email address</label>
                            {error.email && <p className="error">{error.email}</p>}

                        </div>

                        <div className="relative mb-3">
                            <input
                                type="tel"
                                value={telephone}
                                className={INPUT_STYLE}
                                id="floatingTelephone99"
                                placeholder="telephone"
                                onChange={(e) => setTelephone(e.target.value)}
                            />

                            <label
                                htmlFor="floatingTelephone99"
                                className={INPUT_LABEL}
                            >Telephone</label>
                            {error.telephone && <p className="error">{error.telephone}</p>}

                        </div>

                        <div className="relative mb-3">
                            <input
                                type="password"
                                value={password}
                                className={INPUT_STYLE}
                                id="floatingPassword299"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <label
                                htmlFor="floatingPassword299"
                                className={INPUT_LABEL}
                            >Password</label>
                            {error.password && <p className="error">{error.password}</p>}

                        </div>


                        <div className="relative mb-3">
                            <input
                                type="password"
                                value={password_confirmation}
                                className={INPUT_STYLE}
                                id="floatingPassword99"
                                placeholder="Password"
                                onChange={(e) => setPassword_confirmation(e.target.value)}
                            />

                            <label
                                htmlFor="floatingPassword99"
                                className={INPUT_LABEL}
                            >confirm Password
                            </label>
                            {error.password && <p className="error">{error.password}</p>}
                        </div>

                        <div className="relative mb-3">

                            <h4 className=' text-lg'>Role</h4>


                            {roles.map((r, index) => {
                                return (
                                    <div key={r.id * 91} className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            className={RADIO_STYLE}
                                            type="radio"
                                            name="role"
                                            value={r.id}
                                            id={`radioDefault${r.id}${r.id}`}
                                            onClick={(e) => setRole(e.target.value)}
                                            ref={(el) => roleRef.current[index] = el}
                                        />
                                        <label
                                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor={`radioDefault${r.id}${r.id}`}>
                                            {r.nom}
                                        </label>
                                    </div>
                                )
                            })}


                        </div>


                        <div className="relative mb-3">


                            <select data-te-select-init onChange={(e) => setDesignation(e.target.value)}>
                                {designations.length > 0 && designations.map((d, index) => {
                                    return (<option ref={(el) => designationRef.current[index] = el} key={d.id_designation} value={d.id_designation}>
                                        {d.nom}
                                    </option>
                                    )
                                })}
                            </select>
                            <label data-te-select-label-ref>Designations</label>

                        </div>



                        <div className="mb-3">
                            <label
                                htmlFor="htmlFormFile99"
                                className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                            >Image</label>
                            <input
                                className={FILE_INPUT_STYLE}
                                type="file"
                                id="htmlFormFile99"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                            {error.image && image && <p className="error">{error.image}</p>}
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
                                setIdMembre(null)
                                setMembre({})
                                setError({})
                                setRole(null)
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
