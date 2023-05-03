import React ,{useEffect ,useState,useContext,useCallback} from 'react'
import axiosClient from "../../axios"
import Delete from '../modals/delete/Delete'
import { useTranslation } from 'react-i18next';
import { StateContext } from '../../ContextProvider';
import LoadingMarkup from '../loader/LoadingMarkup';
import { Description } from '../modals/description/Description';
import EditModal from '../modals/edit/EditModal';
import Search from '../sub-components/search/Search';
import { AddCircle } from 'iconsax-react';
import { AddProject } from '../modals/add/AddProject';
import TaskCard from './TaskCard';
import "./tasks.css"
import { AddTask } from '../modals/add/AddTask';
import DeleteTask from '../modals/delete/Delete';
import EditTask from '../modals/edit/editTask/EditTask';



export default function Tasks() {
  const [loading, setLoading] = useState(false)
  const {taches,setTaches,idTache,membres,setMembres,refresh,setAddTaskModalIsOpen,addTaskModalIsOpen , projets,setProjets} = useContext(StateContext)

  const [tachesFetched, setTachesFetched] = useState(taches)
  const [currentUser , setCurrentUser]= useState(JSON.parse(localStorage.getItem("currentUser")))
  
  const fetchTaches = useCallback(() => axiosClient.get(`/taches`), [taches]);
  const fetchMembres = useCallback(() => axiosClient.get("/membres"), [membres])
  
  useEffect(() => {
    if (!taches.length) {
      async function fetchTachesData() {
        try {
          setLoading(true)
          const tachesData = await fetchTaches()
          const membresData = await fetchMembres()
          setTaches(tachesData.data)
          setMembres(membresData.data)
        }
        catch (error) {
          console.log(error);
        }
        finally{
          setLoading(false)
        }
      }
      fetchTachesData()
    }
  }, [refresh])

  useEffect(() => {
    axiosClient.get("/taches").then((response) => {
      setTaches(response.data)
      setTachesFetched(response.data)
      
    })
    if (!projets.length) {
        axiosClient.get("/projets").then((response) => {
        setProjets(response.data)
      })
    }
  }, [refresh])
 
  const searchTache = (e) => {
        setTachesFetched(taches.filter((p) =>( p.nom.toLocaleLowerCase().includes(e))))
    }
  const { t } = useTranslation()
  
  return (
    <>
      <h1>{t("taches")}</h1>
      <Search searchCloser={searchTache}/>
      {loading ? <div className='loader'><LoadingMarkup /></div>
        : (
          <div className="content-container">
            {(localStorage.getItem("role") === "admin" || localStorage.getItem("role")==="chef_de_projet" )
              &&
              <AddTask/>
            }
            {(localStorage.getItem("role") === "admin" || localStorage.getItem("role")==="chef_de_projet")
              &&
              <DeleteTask id={idTache} />
            }
            
            <Description />

            {(localStorage.getItem("role") === "admin" || localStorage.getItem("role")==="chef_de_projet")
              &&
              <EditTask id={idTache} />}
            
            {tachesFetched.map((tache) => { 
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
              const projet = tache.projet
              const chef = tache.projet.chef_projet
             

              return <TaskCard key={tache.id_tache}
                id={id}
                nom={nom}
                description = {description}
                dateCreation={dateCreation} 
                dateDebut={dateDebut}
                dateFin={dateFin}
                membres={membres}
                projet= {projet}
                statut={statut}
                chef={chef}
              />
            })}
            {(localStorage.getItem("role") === "admin" || localStorage.getItem("role")==="chef_de_projet")
              &&
            <div onClick={() => setAddTaskModalIsOpen(!addTaskModalIsOpen)} className="ajouter">
              <AddCircle size="80"   color='#8A4DD9' variant="Bulk"/>
            </div>}
            </div>
        )}
      </>
  )
}
