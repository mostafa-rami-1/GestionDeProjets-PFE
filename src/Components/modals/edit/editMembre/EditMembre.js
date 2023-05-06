import React, { useContext, useEffect, useRef, useState } from 'react'
import axiosClient from '../../../../axios'
import { StateContext } from '../../../../ContextProvider'
import {
    INPUT_LABEL, INPUT_STYLE, CLOSE_STYLE, MODIFY_STYLE, FILE_INPUT_STYLE, RADIO_STYLE
} from './inputStyle'
import roles from './roles'


import { Select, initTE } from "tw-elements";
export default function EditMembre() {
    const { idMembre,setMembre,setIdMembre ,designations,setDesignations} = useContext(StateContext)
    const [id, setId] = useState(null)
   
    const [error, setError] = useState({ nom: "", prenom: "", email: "", telephone: "", password: "", password_confirmation:"",image:"",role:""})

    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [telephone, setTelephone] = useState("")
    const [designation, setDesignation] = useState(null)
    const [password, setPassword] = useState("")
    const [password_confirmation, setPassword_confirmation] = useState("")
    const [image, setImage] = useState(null)
    const [role,setRole]=useState(null)
    const roleRef = useRef([])    
    const designationRef = useRef([])


    useEffect(() => {
        setId(idMembre)
        if (id) {
            initTE({ Select });
            axiosClient.get(`/membres/${id}`).then((r) => {
                setNom(r.data.nom)
                setPrenom(r.data.prenom)
                setEmail(r.data.email)
                setTelephone(r.data.telephone)
                setRole(r.data.role.id_role)
                setDesignation(r.data.id_designation)
            }).catch((e) => {
                console.log(e);
            })

            if (designations.length <=0) {
                axiosClient.get("/designations").then((r) => {
                    setDesignations(r.data)
                   
                }).catch((e) => {
                    console.log(e);
                })
            }
        }
            
        
    }, [idMembre, id])

    useEffect(() => {
        roleRef.current.forEach((e) => {
            const idRole = parseInt(e?.getAttribute('value'))
            if (idRole === role) {
                e?.setAttribute("checked",true)
            } else {
                e?.removeAttribute("checked")
            }
        })
    }, [role])
    useEffect(() => {
        designationRef.current.forEach((e) => {
            const idDesognation = parseInt(e?.getAttribute('value'))
            if (idDesognation === designation) {
                e?.setAttribute("selected", true)
            } else {
                e?.removeAttribute("selected")
            }
        })
    }, [designation])
    
    
    
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
        data.append("_method", "patch")
        axiosClient.post(`/membres/${id}`, data).then((response) => {
            setError({})
            setIdMembre(null)
        }).catch((err) => {
            if (err.response.data.errors) {
                const { nom, prenom, email, telephone, password, image, id_role} = err.response.data.errors
                setError({ nom, prenom, email, password, telephone, image, role: id_role})
                throw err.response.data.errors
            }
        })
    }
    

    return (
        <form method='post' onSubmit={handleSubmit} encType='multipart/form-data'
            data-te-modal-init
            className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
            id="staticBackdrop"
            data-te-backdrop="static"
            data-te-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true">
            <div
                data-te-modal-dialog-ref
                className="pointer-events-none  relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">

                <div
                    className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    <div
                        className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">

                        <h5
                            className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                            id="exampleModalLabel">
                            Modifier ce membre
                        </h5>
                        
                        <button
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
                                value={prenom}
                                className={INPUT_STYLE}
                                id="floatingPrenom"
                                placeholder="Prenom"
                                onChange={(e) => setPrenom(e.target.value)}
                            />

                            <label
                                htmlFor="floatingPrenom"
                                className={INPUT_LABEL}
                            >Prenom</label>
                            {error.prenom && <p className="error">{error.prenom}</p>}


                        </div>

                        <div className="relative mb-3">
                            <input
                                type="text"
                                value={nom}
                                className={INPUT_STYLE}
                                id="floatingNom"
                                placeholder="nom"
                                onChange={(e) => setNom(e.target.value)}
                            />

                            <label
                                htmlFor="floatingNom"
                                className={INPUT_LABEL}
                            >Nom</label>
                            {error.nom && <p className="error">{error.nom}</p>}

                        </div>
                        <div className="relative mb-3">
                            <input
                                type="email"
                                value={email}
                                className={INPUT_STYLE}
                                id="floatingInput1"
                                placeholder="name@example.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label
                                htmlFor="floatingInput1"
                                className={INPUT_LABEL}
                            >Email address</label>
                            {error.email && <p className="error">{error.email}</p>}

                        </div>

                        <div className="relative mb-3">
                            <input
                                type="tel"
                                value={telephone}
                                className={INPUT_STYLE}
                                id="floatingTelephone"
                                placeholder="telephone"
                                onChange={(e) => setTelephone(e.target.value)}
                            />

                            <label
                                htmlFor="floatingTelephone"
                                className={INPUT_LABEL}
                            >Telephone</label>
                            {error.telephone && <p className="error">{error.telephone}</p>}

                        </div>

                        <div className="relative mb-3">
                            <input
                                type="password"
                                value={password}
                                className={INPUT_STYLE}
                                id="floatingPassword2"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            
                            <label
                                htmlFor="floatingPassword2"
                                className={INPUT_LABEL}
                            >Password</label>
                            {error.password  && <p className="error">{error.password}</p>}

                        </div>


                        <div className="relative mb-3">
                            <input
                                type="password"
                                value={password_confirmation}
                                className={INPUT_STYLE}
                                id="floatingPassword"
                                placeholder="Password"
                                onChange={(e) => setPassword_confirmation(e.target.value)}
                            />

                            <label
                                htmlFor="floatingPassword"
                                className={INPUT_LABEL}
                            >confirm Password
                            </label>
                            {error.password && <p className="error">{error.password}</p>}
                        </div>
                        
                        <div className="relative mb-3">
                            
                            <h4 className=' text-lg'>Role</h4>
                            

                            {roles.map((r,index) => {
                                return (
                                    <div key={r.id*91} className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                                        <input
                                            className={RADIO_STYLE}
                                            type="radio"
                                            name="role"
                                            value={r.id}
                                            id={`radioDefault${r.id}`}
                                            onClick={(e) => setRole(e.target.value)}
                                            ref={(el) => roleRef.current[index] = el}
                                        />
                                        <label
                                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                            htmlFor={`radioDefault${r.id}`}>
                                            {r.nom}
                                        </label>
                                    </div>
                                )
                            })}

                            
                        </div>

                  
                        <div className="relative mb-3">
                          

                            <select data-te-select-init onChange={(e)=>setDesignation(e.target.value)}>
                                {designations.length > 0 && designations.map((d,index) => {
                                    return( <option ref={(el)=>designationRef.current[index]=el}  key={d.id_designation} value={d.id_designation}>
                                                {d.nom}
                                            </option>
                                    )
                                })}
                            </select>
                            <label data-te-select-label-ref>Designations</label>

                      </div>

                        
                        
                        <div className="mb-3">
                            <label
                                htmlFor="htmlFormFile"
                                className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                            >Image</label>
                            <input
                                className={FILE_INPUT_STYLE}
                                type="file"
                                id="htmlFormFile"
                                onChange={(e)=>setImage(e.target.files[0])}
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
            </div>
        </form>
    )
}
