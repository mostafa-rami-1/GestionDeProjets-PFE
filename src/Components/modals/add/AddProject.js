import { Back } from 'iconsax-react'
import React,{useState,useContext,useEffect,useRef} from 'react'
import axiosClient from '../../../axios'
import { StateContext } from '../../../ContextProvider'
import MiniLoader from '../../loader/MiniLoader'
import statues from '../../projects/ProjectStatus'
import Search from '../../sub-components/search/Search'
import MessageApi from '../message/Message'
import '../edit/editModal.css'

export const AddProject = () => {
    
  const { addModalIsOpen,projets, setAddModalIsOpen,membres ,categories,clients ,refresh,setRefresh} = useContext(StateContext)
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
    const [nom, setNom] = useState(`projet ${projets.length}`)
    const [description, setDescription] = useState("")
    const [date_livraison, setDatelivraison] = useState("")
    const [id_chef_projet, setId_chef_projet] = useState(JSON.parse(localStorage.getItem("currentUser")).id_membre||membres[0]?.id_membre||membres.length)
    const [id_client, setId_client] = useState(clients[0]?.id_client || null)
    const [cout, setCout] = useState(0.00)
    const [statut, setStatut] = useState(0)
    const [id_categorie, setId_categorie] = useState(categories[0]?.id_categorie||categories.length)
  

    useEffect(() => {
        setStatut(null)
        setIsDataReceived(false)
        if (addModalIsOpen) {
            setMembresChecked([])
            setMembresEdit(membres)
        }
    }, [addModalIsOpen])
    
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
            axiosClient.post(`/projets`, {
                nom,
                description: description || `projet ${projets.length}` ,
                date_livraison,
                id_chef_projet,
                id_client,
                cout,
                statut: statut || 0,
                id_categorie,
                membres: membresChecked,
               
            }).then((response) => {
                console.log(response.data);
                setRefresh(!refresh)
                setSuccess(true)
                setMsg("projet creer avec success")
                setTimeout(() => {
                    setAddModalIsOpen(false)
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
      <div className={addModalIsOpen ? 'show' : 'hide'}>
          {msg ? <div className="edit-center-loading">
              <MessageApi msg={msg} success={success} />
          </div> : 
            (
            <form className='edit-form'>
                <span className='hide-edit' onClick={() => {
                        setMembresChecked([])
                        setAddModalIsOpen(false)
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
                      {localStorage.getItem("role")==="admin" && <div className="edit-chef-projet">
                          <label htmlFor="chef-projet-select">Chef de projet</label>
                          <select className='select' onChange={(e)=>setId_chef_projet(e.target.value)}  id="chef-projet-select"  defaultValue={0}>
                            {membres && membres.map((membre) => {
                                return <option key={membre.id_membre} value={membre.id_membre}>{membre.nom}</option>
                                })
                            }
                        </select>
                      </div>}
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
                                    <div key={membre.id_membre+3} className='membre-check-box'>
                                        <span>{`${membre.prenom} ${membre.nom}`}</span>
                                        <label htmlFor={membre.id_membre+399} className="container-checkbox">
                                            <input
                                            type="checkbox"
                                            id={membre.id_membre+399}
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
                          {isEditing ? <MiniLoader /> : <input onClick={handleAdd} type="submit" value="Ajouter ce projet" disabled={isDataReceived} />}         
                </div>  
            </form>    
            )
            }
    </div>
  )
}
