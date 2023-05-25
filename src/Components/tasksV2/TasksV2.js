import React, { useEffect, useState, useContext, useCallback } from 'react'
import axiosClient from "../../axios"

import { useTranslation } from 'react-i18next';
import { StateContext } from '../../ContextProvider';
import LoadingMarkup from '../loader/LoadingMarkup';
import { Description } from '../modals/description/Description';

import Search from '../sub-components/search/Search';
import { AddCircle } from 'iconsax-react';

import TaskCard from '../tasks/TaskCard';
import "../tasks/tasks.css"
import { AddTask } from '../modals/add/AddTask';
import DeleteTask from '../modals/delete/deleteTask/DeleteTask';
import EditTask from '../modals/edit/editTask/EditTask';



export default function TasksV2() {
    const [loading, setLoading] = useState(false)
    const { taches, setTaches, idTache, membres, setMembres, refresh, setAddTaskModalIsOpen, addTaskModalIsOpen, projets, setProjets } = useContext(StateContext)

    const [tachesFetched, setTachesFetched] = useState([])
    const [projetsFetched, setProjetsFetched] = useState(projets)

   // const fetchTaches = useCallback(() => axiosClient.get(`/taches`), [taches]);

    const fetchMembres = useCallback(() => axiosClient.get("/membres"), [membres])

    useEffect(() => {
        if (!taches.length) {
            async function fetchTachesData() {
                try {
                    const membresData = await fetchMembres()
                    setMembres(membresData.data)
                }
                catch (error) {
                    console.log(error);
                }
                finally {
                    setLoading(false)
                }
            }
            fetchTachesData()
        }
    }, [refresh])

    useEffect(() => {
        
        axiosClient.get("/projets").then((response) => {
            setProjetsFetched(response.data)
            console.log(projetsFetched);
        })
        if (!projets.length) {
            axiosClient.get("/projets").then((response) => {
                setProjets(response.data)
            })
        }
    }, [refresh])

    const searchTache = (e) => {
        setTachesFetched(taches.filter((p) => (p.nom.toLocaleLowerCase().includes(e))))
    }
    const { t } = useTranslation()
    const handleMouseEnter = () => {
        document.documentElement.style.overflow = "hidden";
    };

    const handleMouseLeave = () => {
        document.documentElement.style.overflow = "auto";
    };


    return (
        <>
            <h1>{t("taches")}</h1>
            <Search searchCloser={searchTache} />
            {loading ? <div className='loader'><LoadingMarkup /></div>
                : (
                    <div className="content-container">
                        {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet")
                            &&
                            <AddTask />
                        }
                        {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet")
                            &&
                            <DeleteTask id={idTache} />
                        }

                        <Description />

                        {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet")
                            &&
                            <EditTask id={idTache} />
                        }
                        {
                            projetsFetched.length > 0 &&
                          
                            <div>
                                    {
                                        projetsFetched.map((p) => {
                                            if (p.taches.length > 0) {
                                                return (
                                                    <div key={p.id_projet} className='shadow border p-2 m-2  '>
                                                        <h2 className=' text-violet-600 text-lg font-bold'> <span className=' text-orange-400'>Projet: </span> {p.nom}</h2>
                                                        <div className='flex justify-between gap-4 flex-row overflow-x-scroll flex-nowrap'>
                                                            {p.taches.map((tache) => {
                                                                const id = tache.id_tache
                                                                const nom = tache.nom
                                                                const description = tache.description
                                                                const membres = tache.membres
                                                                const dateCreationObj = new Date(tache.created_at);
                                                                const dateCreation = `${dateCreationObj.getFullYear()}-${dateCreationObj.getMonth() + 1}-${dateCreationObj.getDate()}`
                                                                const dateDebutObj = new Date(tache.date_debut);
                                                                const dateDebut = `${dateDebutObj.getFullYear()}-${dateDebutObj.getMonth() + 1}-${dateDebutObj.getDate()}`
                                                                const dateFinObj = new Date(tache.date_fin);
                                                                const dateFin = `${dateFinObj.getFullYear()}-${dateFinObj.getMonth() + 1}-${dateFinObj.getDate()} ${dateFinObj.getHours()}-${dateFinObj.getMinutes()}-${dateFinObj.getSeconds()}`
                                                                const statut = tache.statut
                                                                const projet = p
                                                                const chef = p.chef_projet
                                                                return <TaskCard key={tache.id_tache}
                                                                    id={id}
                                                                    nom={nom}
                                                                    description={description}
                                                                    dateCreation={dateCreation}
                                                                    dateDebut={dateDebut}
                                                                    dateFin={dateFin}
                                                                    membres={membres}
                                                                    projet={projet}
                                                                    statut={statut}
                                                                    chef={chef}
                                                                />
                                                            })}
                                                        </div>

                                                    </div>

                                                )
                                            }
                                        }
                                        )
                                    }
                           </div>
                        }
                        {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet")
                            &&
                            <div onClick={() => setAddTaskModalIsOpen(!addTaskModalIsOpen)} className="ajouter">
                                <AddCircle size="80" color='#8A4DD9' variant="Bulk" />
                            </div>}
                    </div>
                )}
        </>
    )
}
