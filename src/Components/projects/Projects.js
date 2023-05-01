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



export default function Projects() {
  const [loading, setLoading] = useState(false)
  const { idProjet, refresh,setRefresh, projets, setProjets ,membres,setMembres, clients,setClients,categories,setCategories,setDataFetched} = useContext(StateContext)
  const fetchProjets = useCallback(() => axiosClient.get(`/projets`), [projets]);
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
    axiosClient.get("/projets").then((response)=>setProjets(response.data))
  },[refresh])
  
  const { t } = useTranslation()
  
  return (
    <>
      <h1>{t("Projets")}</h1>
      {loading ? <div className='loader'><LoadingMarkup /></div>
        : (
          <div className="content-container">
            <Delete id={idProjet} />
            <Description />
            <EditModal id={idProjet}/>
            {projets.map((projet) => { 
              const id = projet.id_projet
              const nom = projet.nom
              const description = projet.description
              const chef =  projet.chef
              const membres = projet.membres
              const dateCreationObj = new Date(projet.created_at);
              const dateCreation = `${dateCreationObj.getFullYear()}-${dateCreationObj.getMonth()+1}-${dateCreationObj.getDate()}`
              const dateLivraison = projet.date_livraison
              const categorie = projet.categorie.nom
              const client = `${projet.client.prenom} ${projet.client.nom}`
              const statut = projet.statut
              const cout = `${projet.cout} MAD`

              return <ProjectCard key={projet.nom}
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
            
            </div>
        )}
      </>
  )
}
