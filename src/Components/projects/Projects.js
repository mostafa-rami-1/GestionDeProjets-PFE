import React ,{useEffect ,useState,useContext,useCallback} from 'react'
import axiosClient from "../../axios"
import Delete from '../modals/delete/Delete'
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import { StateContext } from '../../ContextProvider';
import LoadingMarkup from '../loader/LoadingMarkup';
import "./projetcs.css"
import { Description } from '../modals/description/Description';
import EditModal from '../modals/edit/EditModal';
import Search from '../sub-components/search/Search';
import { AddCircle } from 'iconsax-react';
import { AddProject } from '../modals/add/AddProject';




export default function Projects() {
  const [loading, setLoading] = useState(false)
  const { idProjet, refresh, projets, setProjets, membres, setMembres, clients, setClients, categories, setCategories, setDataFetched, addModalIsOpen, setAddModalIsOpen} = useContext(StateContext)

  const [projetsFetched, setProjetsFetched] = useState(projets)
 
  
  const fetchProjets = useCallback(() => axiosClient.get(`/projets`), [projets])
  const fetchMembres = useCallback(() => axiosClient.get("/membres"), [membres])
  const fetchCategories = useCallback(() => axiosClient.get("/categories"), [categories])
  const fetchClients = useCallback(()=>axiosClient.get("/clients"),[clients])

 
  useEffect(() => {
    if (!projets.length) {
      async function fetchProjetsData() {
        try {
          setLoading(true)
          const projetsData = await fetchProjets()
          const membresData = await fetchMembres()
          const categoriesData = await fetchCategories()
          const clientsData= await fetchClients()
          setProjets(projetsData.data)
          setProjetsFetched(projetsData.data)
          setMembres(membresData.data)
          setCategories(categoriesData.data)
          setClients(clientsData.data)
          setDataFetched(true)
        }
        catch (error) {
          console.log(error);
        }
        finally{
          setLoading(false)
        }
      }
      fetchProjetsData()
    }
  }, [refresh])

  useEffect(() => {
    axiosClient.get("/projets").then((response) => {
      setProjets(response.data)
      setProjetsFetched(response.data)
    })
  },[refresh])
  const searchProject = (e) => {
        setProjetsFetched(projets.filter((p) =>( p.nom.toLocaleLowerCase().includes(e))))
    }
  const { t } = useTranslation()
  
  return (
    <>
      <h1>{t("Projets")}</h1>
      <Search searchCloser={searchProject}/>
      {loading ? <div className='loader'><LoadingMarkup /></div>
        : (
          <div className="content-container">
            {(localStorage.getItem("role") === "admin" || localStorage.getItem("role")==="chef_de_projet" )
              &&
              <AddProject />
            }
            {(localStorage.getItem("role") === "admin" || localStorage.getItem("role")==="chef_de_projet")
              &&
              <Delete id={idProjet} />
            }
            
            <Description />

            {(localStorage.getItem("role") === "admin" || localStorage.getItem("role")==="chef_de_projet")
              &&
              <EditModal id={idProjet} />}
            
            {projetsFetched.map((projet) => { 
              const id = projet.id_projet
              const nom = projet.nom
              const description = projet.description
              const chef =  projet.chef_projet
              const membres = projet.membres
              const dateCreationObj = new Date(projet.created_at);
              const dateCreation = `${dateCreationObj.getFullYear()}-${dateCreationObj.getMonth()+1}-${dateCreationObj.getDate()}`
              const dateLivraison = projet.date_livraison
              const categorie = projet.categorie.nom
              const client = `${projet.client.prenom} ${projet.client.nom}`
              const statut = projet.statut
              const cout = `${projet.cout} MAD`

              return <ProjectCard key={projet.id_projet}
                id={id}
                nom={nom}
                description = {description}
                chef={chef}
                dateCreation={dateCreation} 
                dateLivraison={dateLivraison}
                membres={membres}
                categorie={categorie}
                client={client}
                statut={statut}
                cout={cout}
              />
            })}
            {(localStorage.getItem("role") === "admin" || localStorage.getItem("role")==="chef_de_projet")
              &&
            <div onClick={() => setAddModalIsOpen(!addModalIsOpen)} className="ajouter">
              <AddCircle size="80"   color='#8A4DD9' variant="Bulk"/>
            </div>}
            </div>
        )}
      </>
  )
}
