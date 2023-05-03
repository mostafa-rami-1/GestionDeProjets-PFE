import { Back } from 'iconsax-react'
import React,{useState,useContext,useEffect,useRef} from 'react'
import axiosClient from '../../../axios'
import { StateContext } from '../../../ContextProvider'
import MiniLoader from '../../loader/MiniLoader'
import statues from '../../projects/ProjectStatus'
import Search from '../../sub-components/search/Search'
import MessageApi from '../message/Message'
import '../edit/editModal.css'

export const AddTask = () => {
    
  const { addTaskModalIsOpen,setAddTaskModalIsOpen,membres,taches ,refresh,setRefresh,projets} = useContext(StateContext)
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [msg, setMsg] = useState("")
    const [error,setError]=useState("")
    const [success, setSuccess] = useState(false)
    const [isDataReceived,setIsDataReceived]=useState(true)
    const statutRef= useRef([])    
    const membresRefs = useRef([])
    const [memberesEdit, setMembresEdit] = useState(membres)
    const [membresChecked,setMembresChecked]= useState([])
    //data states
    const [nom, setNom] = useState("")
    const [description, setDescription] = useState("")
    const [dateDebut, setDateDebut] = useState("")
    const [dateFin, setDateFin] = useState("")
    const [id_projet, set_IdProjet] = useState(projets.length)
  
   
    const [statut, setStatut] = useState(0)
  
  

    useEffect(() => {
        setStatut(null)
        setIsDataReceived(false)
        if (addTaskModalIsOpen) {
            setMembresChecked([])
            setMembresEdit(membres)
        }
    }, [addTaskModalIsOpen])
    
    useEffect(() => {
        if (statut == null) {
            statutRef.current[0]?.nextElementSibling.classList.add("radio-is-checked")
        } else {
            statutRef.current[0]?.nextElementSibling.classList.remove("radio-is-checked")
        }
    },[statut])
    const handleMembresChange = (event) => {
        const isChecked = event.target.checked
        const selected_id_membre = parseInt(event.target.value)
        switch (isChecked) {
            case false:
                setMembresChecked(membresChecked.filter((membre) => membre !== selected_id_membre))
                
                break;
            case true:
                setMembresChecked([... new Set([...membresChecked, selected_id_membre])])
                break;
        }
    }

    
    const searchMembre = (e) => {
        setMembresEdit(membres.filter((m) =>( m.nom.toLocaleLowerCase().includes(e) || m.prenom.toLocaleLowerCase().includes(e))))
    }
    

    const handleAdd = (e) => {
        e.preventDefault()
        setError("")
            setIsEditing(true)
            axiosClient.post(`/taches`, {
                nom,
                description: description || `taches ${taches.length}` ,
                date_debut:dateDebut,
                date_fin:dateFin,
                id_projet,
                statut: statut || 0,
                membres: membresChecked,
               
            }).then((response) => {
                console.log(response.data);
                setRefresh(!refresh)
                setSuccess(true)
                setMsg("tache creer avec success")
                setTimeout(() => {
                    setAddTaskModalIsOpen(false)
                    setMsg("")
                }, 1500);
            })
            .catch((e) => {
                    setSuccess(false)
                    setError(e.response.data.message)
                    
            }).finally(() => {
                setIsEditing(false)
            })
       
    }
    
  
  return (
      <div className={addTaskModalIsOpen ? 'show' : 'hide'}>
          {msg ? <div className="edit-center-loading">
              <MessageApi msg={msg} success={success} />
          </div> : 
            (
            <form className='edit-form'>
                <span className='hide-edit' onClick={() => {
                        setMembresChecked([])
                        setAddTaskModalIsOpen(false)
                      }}>
                    <Back size="32" color="#ff8a65" />
                </span>  
              
              <div className="editModal">
                  <div className="edit-left-side">
                    <div className="edit-nom-projet  ">
                        <label htmlFor="nomProjet" name="nom">nom</label>
                          <input className='input' type="text" id='nomProjet' value={nom}
                              onChange={(e)=>setNom(e.target.value)}
                          />
                          
                    </div>
                    <p style={{color:"red"}}>{error}</p>   
                    
                    <div className="edit-statut-projet radio">
                        <h4>Statut</h4>       
                        <div>
                            {statues.map((statut,index) => {
                              return (
                                <label  key={statut.nom}>
                                    <input  type="radio"  ref={(el) => statutRef.current[index] = el} value={statut.id} name="statut" id={statut.nom}
                                                                onChange={(e)=>setStatut(e.target.value)}
                                                            />
                                      <span >{statut.nom}</span>
		                        </label>    
                             )
                         })}      
                        </div>
                    </div>

                    
              </div>

               <div className="edit-right-side">
                   <div className="edit-dateDebut-projet">
                        <label htmlFor="dateDebut">date de debut</label>
                        <input value={dateDebut} className='date' type="date" name="dateDebut" id="dateDebut" onChange={(e)=>setDateDebut(e.target.value)} />
                    </div>
                              
                  
                    <div className="edit-dateDebut-projet">
                        <label htmlFor="dateFin">date de realisation estimee</label>
                        <input value={dateFin} className='date' type="date" name="dateFin" id="dateFin" onChange={(e)=>setDateFin(e.target.value)} />
                    </div>
                              
                      {localStorage.getItem("role")==="admin" && <div className="edit-chef-projet">
                          <label htmlFor="chef-projet-select">projet</label>
                          <select className='select' onChange={(e)=>set_IdProjet(e.target.value)}  id="chef-projet-select"  defaultValue={projets.length}>
                            {projets && projets.map((projet) => {
                                return <option key={projet.id_projet} value={projet.id_projet}>{projet.nom}</option>
                                })
                            }
                        </select>
                      </div>}
                      
                      
                </div>
                      </div>

              <div className="edit-membres-projet">
                          <h4 className='edit-membre-title'>Membres</h4>
                          <Search searchCloser={searchMembre} />
                          <div className="edit-membres-projet-membres-container">
                            {memberesEdit && memberesEdit.map((membre,index) => {
                                return (
                                    <div key={membre.id_membre+39} className='membre-check-box'>
                                        <span>{`${membre.prenom} ${membre.nom}`}</span>
                                        <label htmlFor={membre.id_membre+3} className="container-checkbox">
                                            <input
                                            type="checkbox"
                                            id={membre.id_membre+39}
                                            value={membre.id_membre}
                                           
                                            onClick={handleMembresChange}
                                     
                                            ref={(el) => membresRefs.current[index] = el}
                                            />
                                            <div className="checkmark"></div>
                                        </label>
                                    </div>
                                )
                                })
                            } 
                          </div>
              </div>
                <div className="edit-description-projet">
                    <label htmlFor="description-projet">Description</label>
                    <textarea id='description-projet' cols="30" rows="10" value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    >   
                    </textarea>
                </div>
                <div className="submit-edit">
                          {isEditing ? <MiniLoader /> : <input onClick={handleAdd} type="submit" value="Ajouter cette tache" disabled={isDataReceived} />}         
                </div>  
            </form>    
            )
            }
    </div>
  )
}
