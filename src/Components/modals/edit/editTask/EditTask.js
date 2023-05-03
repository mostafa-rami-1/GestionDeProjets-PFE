import React,{useContext, useEffect, useState,useRef} from 'react'
import axiosClient from '../../../../axios'
import { StateContext } from '../../../../ContextProvider'
import statues from '../../../tasks/taskstatus'
import {Back} from "iconsax-react"
import '../editModal.css'
import Search from '../../../sub-components/search/Search'
import MiniLoader from '../../../loader/MiniLoader'
import MessageApi from '../../message/Message'

const EditTask = ({ id }) => {
    const { editTaskModalIsOpen,membres ,setEditTaskModalIsOpen ,refresh,setRefresh,projets,taches} = useContext(StateContext)
    const [loading, setLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [msg, setMsg] = useState("")
    const [success, setSuccess] = useState(false)
    const [isDataReceived,setIsDataReceived]=useState(true)
    const statutRef= useRef([])    
    const membresRefs = useRef([])
    const [memberesEdit,setMembresEdit]= useState(membres)
    //data states
    const [nom, setNom] = useState("")
    const [description, setDescription] = useState("")
    
    
   
 
    const [statut, setStatut] = useState(0)
    const [dateDebut, setDateDebut] = useState("")
    const [dateFin, setDateFin] = useState("")
    const [membresChecked, setMembresChecked] = useState([])
    const [id_projet, set_IdProjet] = useState(projets.length)


    useEffect(() => {
        setStatut(null)
        setIsDataReceived(true)
        if (editTaskModalIsOpen) {
            setMembresEdit(membres)
            axiosClient.get(`/tacheMembres/${id}`)
            .then((response) => {
                setMembresChecked([])
                setMembresChecked(response.data)
                
            })
            .catch((e) => console.log(e))
            axiosClient.get(`taches/${id}`)
            .then((response) => {
                setNom(response.data.nom)
                setDateDebut(response.data.date_debut)
                setDateFin(response.data.date_fin)
                setStatut(response.data.statut)
                setDescription(response.data.description)
                set_IdProjet(response.data.id_projet)
                setIsDataReceived(false)
            })
        }
        
    }, [editTaskModalIsOpen])
    
    useEffect(() => {
        membresRefs.current.forEach((e) => {
            const idm = parseInt(e?.getAttribute('value'))              
            if (membresChecked.includes(idm)) {
                e?.setAttribute("checked", true)
            }else {
                e?.removeAttribute("checked")
            } 
        })
    }, [membresChecked])
   
    
    useEffect(() => {
        statutRef.current.forEach((e) => {
            const idStatut = parseInt(e?.getAttribute('value'))
            if (idStatut === statut) {
                
                e?.nextElementSibling.classList.add("radio-is-checked")
            } else {
                e?.nextElementSibling.classList.remove("radio-is-checked")
            }
       })
    },[statut])
    
    
    
    const handleMembresChange = (event) => {
        const isChecked = event.target.checked
        const selected_id_membre = parseInt(event.target.value)
        switch (isChecked) {
            case false:
                setMembresChecked(membresChecked.filter((membre) => membre !== selected_id_membre))
                console.log("false");
                break;
            case true:
                setMembresChecked([... new Set([...membresChecked, selected_id_membre])])
                break;
        }
    }

    
    const searchMembre = (e) => {
        setMembresEdit(membres.filter((m) =>( m.nom.toLocaleLowerCase().includes(e) || m.prenom.toLocaleLowerCase().includes(e))))
    }
    

    const handleModify = (e) => {

        e.preventDefault()
      
            setIsEditing(true)
            axiosClient.patch(`/taches/${id}`, {
                nom,
                description: description || `taches ${taches.length}` ,
                date_debut:dateDebut,
                date_fin:dateFin,
                id_projet,
                statut: statut || 0,
                membres: membresChecked,
            }).then((response) => {
                setRefresh(!refresh)
                setSuccess(true)
                setMsg(response.data.message)
                console.log(response.data);
            })
            .catch((e) => {
                    setSuccess(false)
                    setMsg("Erreur ): ")
                    console.log(e)
            }).finally(() => {
                    setIsEditing(false)
                    setTimeout(() => {
                    setEditTaskModalIsOpen(false)
                    setMsg("")
                }, 1500);
            })
       
    }
    
  
  return (
      <div className={editTaskModalIsOpen ? 'show' : 'hide'}>
          {msg ? <div className="edit-center-loading">
              <MessageApi msg={msg} success={success} />
          </div> : 
            (
            <form className='edit-form'>
                      <span className='hide-edit' onClick={() => {
                          setMembresChecked([])
                          
                            setEditTaskModalIsOpen(false)
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
                  
                    
                      <div className="edit-chef-projet">
                          <label htmlFor="chef-projet-select">projet</label>
                          <select className='select' onChange={(e)=>set_IdProjet(e.target.value)}  id="chef-projet-select"  defaultValue={0}>
                            {projets && projets.map((projet) => {
                                return <option key={projet.id_projet} value={projet.id_projet}>{projet.nom}</option>
                                })
                            }
                        </select>
                      </div>
                      
                      
                </div>
                      </div>

              <div className="edit-membres-projet">
                          <h4 className='edit-membre-title'>Membres</h4>
                          <Search searchCloser={searchMembre} />
                          <div className="edit-membres-projet-membres-container">
                            {memberesEdit && memberesEdit.map((membre,index) => {
                                return (
                                    <div key={membre.id_membre} className='membre-check-box'>
                                        <span>{`${membre.prenom} ${membre.nom}`}</span>
                                        <label htmlFor={membre.id_membre+69} className="container-checkbox">
                                            <input
                                            type="checkbox"
                                            id={membre.id_membre+69}
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
                          {isEditing ? <MiniLoader /> : <input onClick={handleModify} type="submit" value="Modifier cette tache" disabled={isDataReceived} />}         
                </div>  
            </form>    
            )
            
            
            }
    </div>
  )
}

export default React.memo(EditTask)