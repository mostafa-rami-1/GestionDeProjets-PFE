import React, { useContext,useLayoutEffect, useState } from 'react'
import {
    INPUT_LABEL, INPUT_STYLE, CLOSE_STYLE, MODIFY_STYLE, FILE_INPUT_STYLE
} from '../modals/edit/editMembre/inputStyle'


import { Select, initTE } from "tw-elements";
import axiosClient from '../../axios';
import { StateContext } from '../../ContextProvider';
export default function Profile() {
    const {  editProfileModalIsOpen, setEditProfileModalIsOpen} = useContext(StateContext)
    const id = JSON.parse(localStorage.getItem("currentUser")).id_membre
    const prenom = JSON.parse(localStorage.getItem("currentUser")).prenom
    const nom = JSON.parse(localStorage.getItem("currentUser")).nom
    const role = JSON.parse(localStorage.getItem("currentUser")).role.id_role
    const [error, setError] = useState({  email: "", telephone: "", password: "", password_confirmation: "", image: "" })

  
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [password, setPassword] = useState("")
    const [password_confirmation, setPassword_confirmation] = useState("")
    const [image, setImage] = useState(null)
    

    useLayoutEffect(() => {
        initTE({ Select });
        axiosClient.get(`/membres/${id}`).then((r) => {
            setEmail(r.data.email)
            setTelephone(r.data.telephone)
            setImage(r.data.image)
        }).catch((e) => {
            console.log(e);
        })            
    }, [])

   
    



    const handleSubmit = (e) => {
        e.preventDefault();
        setError({})
        const data = new FormData()
        data.append("nom", nom)
        data.append("prenom",prenom)
        data.append("image", image)
        data.append("email", email)
        data.append("telephone", telephone)
        data.append("password", password)
        data.append("id_role",role)
        data.append("password_confirmation", password_confirmation)
        data.append("_method", "patch")
        axiosClient.post(`/membres/${id}`, data).then((response) => {
            setError({})
            setEditProfileModalIsOpen(false)
        }).catch((err) => {
            if (err.response.data.errors) {
                const { nom, prenom, email, telephone, password, image} = err.response.data.errors
                setError({ nom, prenom, email, password, telephone, image })
                console.log(err);
            }
        })
    }


    return (
        <div className={editProfileModalIsOpen ? 'show' : 'hide'}>
            <form className=' scale-70' method='post' onSubmit={handleSubmit} encType='multipart/form-data'>
                <div
                    className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">

                        <h5
                            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                            id="exampleModalLabel">
                            Modifier Votre Informations
                        </h5>

                        <button
                            onClick={() => setEditProfileModalIsOpen(false)}
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
                                type="email"
                                value={email}
                                className={INPUT_STYLE}
                                id="floatingInput012"
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label
                                htmlFor="floatingInput012"
                                className={INPUT_LABEL}
                            >Email address</label>
                            {error.email && <p className="error">{error.email}</p>}

                        </div>

                        <div className="relative mb-3">
                            <input
                                type="tel"
                                value={telephone}
                                className={INPUT_STYLE}
                                id="floatingTelephone012"
                                placeholder="telephone"
                                onChange={(e) => setTelephone(e.target.value)}
                            />

                            <label
                                htmlFor="floatingTelephone012"
                                className={INPUT_LABEL}
                            >Telephone</label>
                            {error.telephone && <p className="error">{error.telephone}</p>}

                        </div>

                        <div className="relative mb-3">
                            <input
                                type="password"
                                value={password}
                                className={INPUT_STYLE}
                                id="floatingPassword0122012"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <label
                                htmlFor="floatingPassword0122012"
                                className={INPUT_LABEL}
                            >Password</label>
                            {error.password && <p className="error">{error.password}</p>}

                        </div>


                        <div className="relative mb-3">
                            <input
                                type="password"
                                value={password_confirmation}
                                className={INPUT_STYLE}
                                id="floatingPassword012"
                                placeholder="Password"
                                onChange={(e) => setPassword_confirmation(e.target.value)}
                            />

                            <label
                                htmlFor="floatingPassword012"
                                className={INPUT_LABEL}
                            >confirm Password
                            </label>
                            {error.password && <p className="error">{error.password}</p>}
                        </div>

                        


                        



                        <div className="mb-3">
                            <label
                                htmlFor="htmlFormFile012"
                                className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                            >Image</label>
                            <input
                                className={FILE_INPUT_STYLE}
                                type="file"
                                id="htmlFormFile012"
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
                                setError({})
                                setEditProfileModalIsOpen(false)
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
