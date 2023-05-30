import React ,{useEffect ,useState,useContext,useCallback} from 'react'
import axiosClient from "../../axios"

import { useTranslation } from 'react-i18next';
import { StateContext } from '../../ContextProvider';
import LoadingMarkup from '../loader/LoadingMarkup';
import { Description } from '../modals/description/Description';

import Search from '../sub-components/search/Search';
import { AddCircle } from 'iconsax-react';

import TaskCard from './TaskCard';
import "./tasks.css"
import { AddTask } from '../modals/add/AddTask';
import DeleteTask from '../modals/delete/deleteTask/DeleteTask';
import EditTask from '../modals/edit/editTask/EditTask';
import { Select, initTE } from "tw-elements";
import PdfButton from '../sub-components/PdfButton';


export default function Tasks() {
  const [loading, setLoading] = useState(false)
  const { taches, setTaches, idTache, membres, setMembres, refresh, setAddTaskModalIsOpen, addTaskModalIsOpen, projets, setProjets } = useContext(StateContext)

  const [projetsFetched, setProjetsFetched] = useState(projets)
  const fetchMembres = useCallback(() => axiosClient.get("/membres"), [membres])
  const [filteredTasksMap, setFilteredTasksMap] = useState({});
  const initialFilteredTasksMap = projetsFetched.reduce((map, project) => {
    const tasks = project.taches;
    map[project.id_projet] = tasks;
    return map;
  }, {});

  useEffect(() => {
    initTE({ Select });

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
    })
    if (!projets.length) {
      axiosClient.get("/projets").then((response) => {
        setProjets(response.data)
      })
    }
  }, [refresh])

  const searchTache = (e) => {
    setProjetsFetched(projets.filter((p) => (p.nom.toLocaleLowerCase().includes(e))))
  }
  const { t } = useTranslation()

  

  const handleStatusChange = (projectId, selectedStatus) => {
    if (selectedStatus === "tout") {
      setFilteredTasksMap(initialFilteredTasksMap);
    } else {
      setFilteredTasksMap((prevMap) => ({
        ...prevMap,
        [projectId]: selectedStatus !== null
          ? projetsFetched.find((p) => p.id_projet === projectId).taches.filter((tache) => tache.statut == selectedStatus)
          : projetsFetched.find((p) => p.id_projet === projectId).taches,
      }));
    }
  };


  return (
    <>
      <h1>{t("taches")}</h1>
      <div className="flex justify-between">
        <Search searchCloser={searchTache} placeHolder={"chercher un projet"} />
+      </div>
     
      {loading ? <div className='loader'><LoadingMarkup/></div>
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
              <div className='min-w-full min-h-full '>
                {
                  projetsFetched.map((p) => {
                    if (p.taches.length > 0) {
                      //const filteredTaches = status !== null ? p.taches.filter((tache) => tache.statut == status) : p.taches;
                      const projectId = p.id_projet;
                      const projectTasks = p.taches;
                      const filteredTasks = filteredTasksMap[projectId] || projectTasks;
                      return (
                        <div key={p.id_projet} className='project-card-container min-h-[400px] scale-95   shadow border p-1   min-w-full '>
                          <div className="flex justify-between p-6 gap-5">
                            <h2 className=' text-violet-600 text-lg font-bold'> <span className=' text-orange-400 font-normal'>Projet: </span> {p.nom}</h2>
                            <select data-te-select-init defaultValue="tout"  onChange={(e) => { handleStatusChange(projectId, e.target.value) }}>
                              <option value="tout">tout</option>
                              <option value="0">pas commence</option>
                              <option value="1">entrain</option>
                              <option value="2">finie</option>
                            </select>
                          </div>
                          <div
                            className='flex  gap-4 pb-1 flex-row overflow-x-scroll flex-nowrap'>
                            {filteredTasks.map((tache) => {
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
