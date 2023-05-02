import React,{useContext, useEffect, useState,useRef} from 'react'
import axiosClient from '../../../axios'
import { StateContext } from '../../../ContextProvider'
import statues from '../../projects/ProjectStatus'
import {Back} from "iconsax-react"
import './editModal.css'
import Search from '../../sub-components/search/Search'
import MiniLoader from '../../loader/MiniLoader'
import MessageApi from '../message/Message'

const EditModal = ({ id }) => {
    const { editModalIsOpen, setEditModalIsOpen,membres ,categories,clients ,refresh,setRefresh} = useContext(StateContext)
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
    const [date_livraison, setDatelivraison] = useState("")
    const [id_chef_projet, setId_chef_projet] = useState(null)
    const [id_client, setId_client] = useState(null)
    const [cout, setCout] = useState(0.00)
    const [statut, setStatut] = useState(0)
    const [id_categorie, setId_categorie] = useState(null)
    const [membresChecked, setMembresChecked] = useState([])

    useEffect(() => {
        setStatut(null)
        setIsDataReceived(true)
        if (editModalIsOpen) {
            setMembresEdit(membres)
            axiosClient.get(`/projetMembres/${id}`)
            .then((response) => {
                setMembresChecked([])
                setMembresChecked(response.data)
            })
            .catch((e) => console.log(e))
            axiosClient.get(`projets/${id}`)
            .then((response) => {
                setNom(response.data.nom)
                setCout(response.data.cout)
                setDatelivraison(response.data.date_livraison)
                setStatut(response.data.statut)
                setId_chef_projet(response.data.id_chef_projet)
                setId_client(response.data.id_client)
                setDescription(response.data.description)
                setId_categorie(response.data.id_categorie)
                setIsDataReceived(false)
            })
        }
        
    }, [editModalIsOpen])
    
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
            axiosClient.patch(`/projets/${id}`, {
                nom,
                description,
                date_livraison,
                id_chef_projet,
                id_client,
                cout,
                statut,
                id_categorie,
                membres: membresChecked
            }).then((response) => {
                setRefresh(!refresh)
                setSuccess(true)
                setMsg(response.data.message)
            })
            .catch((e) => {
                    setSuccess(false)
                    setMsg("Erreur ): ")
                    console.log(e)
            }).finally(() => {
                    setIsEditing(false)
                    setTimeout(() => {
                    setEditModalIsOpen(false)
                    setMsg("")
                }, 1500);
            })
       
    }
    
  
  return (
      <div className={editModalIsOpen ? 'show' : 'hide'}>
          {msg ? <div className="edit-center-loading">
              <MessageApi msg={msg} success={success} />
          </div> : 
            (
            <form className='edit-form'>
                      <span className='hide-edit' onClick={() => {
                          setMembresChecked([])
                          
                            setEditModalIsOpen(false)
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

                    <div className="edit-categorie-projet ">
                        <label htmlFor="categorie">Categorie</label>
                          <select className='select' name="id_categorie" id="categorie"
                              onChange={(e) => setId_categorie(e.target.value)}
                               defaultValue="categorie">
                              
                            {categories && categories.map((categorie) => {
                                return (
                                    <option key={categorie.id_categorie} value={categorie.id_categorie}>{categorie.nom}</option>
                                )
                                })
                            }
                        </select>
                  </div>
              </div>

               <div className="edit-right-side">
                   <div className="edit-dateLivraison-projet">
                        <label htmlFor="datelivraison">date de livraison</label>
                        <input value={date_livraison} className='date' type="date" name="datelivraison" id="datelivraison" onChange={(e)=>setDatelivraison(e.target.value)} />
                    </div>
                  
                    <div className="edit-client-projet">
                        <label htmlFor="clients">Client</label>
                          <select className='select' onChange={(e)=>setId_client(e.target.value)}
                              name="id_client" id="clients" defaultValue="client">
                                {clients && clients.map((client) => {
                                    return <option key={client.id_client}
                                            value={client.id_client}>{client.nom}
                                        </option>
                                    })
                                }
                        </select>
                      </div>
                      <div className="edit-chef-projet">
                          <label htmlFor="chef-projet-select">Chef de projet</label>
                          <select className='select' onChange={(e)=>setId_chef_projet(e.target.value)}  id="chef-projet-select"  defaultValue={0}>
                            {membres && membres.map((membre) => {
                                return <option key={membre.id_membre} value={membre.id_membre}>{membre.nom}</option>
                                })
                            }
                        </select>
                      </div>
                      <div className="edit-cout-projet">
                          <label htmlFor="cout">Cout</label>
                                  <input className='input' type="text" id='cout' inputMode='numeric' value={cout} onChange={(e) => {
                                      if (/^\d*\.?\d{0,2}$/.test(e.target.value)) {
                                            setCout(e.target.value)
                                      }
                                  }} />
                                
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
                                        <label htmlFor={membre.id_membre} className="container-checkbox">
                                            <input
                                            type="checkbox"
                                            id={membre.id_membre}
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
                          {isEditing ? <MiniLoader /> : <input onClick={handleModify} type="submit" value="Modifier ce projet" disabled={isDataReceived} />}         
                </div>  
            </form>    
            )
            
            
            }
    </div>
  )
}

export default React.memo(EditModal)