import React,{useContext,memo} from 'react'
import profilepng from '../../assets/Profile.png'
import {Trash ,ReceiptText,Edit} from "iconsax-react"
import { StateContext } from '../../ContextProvider'
import statues from './taskstatus'




const TaskCard = ({id,nom,description,membres,dateCreation,dateDebut,dateFin,projet,statut,chef})   => {
    const { setEditTaskModalIsOpen, editTaskModalIsOpen,deleteTaskModalIsOpen,setDeleteTaskModalIsOpen,setIdTache ,descriptionModalIsOpen,setDescriptionModalIsOpen,setTaskDescription} = useContext(StateContext)
    
    const openDeleteTaskModal = (id) => {
        setIdTache(id)

        setDeleteTaskModalIsOpen(!deleteTaskModalIsOpen)
    }
    const openDescriptionModal = (desc) => { 
        setTaskDescription(desc)
        setDescriptionModalIsOpen(!descriptionModalIsOpen)
    }
   
  return (
      <>
        <div className='projetCarte'>
            <h3>{nom}</h3>
            <h4>Chef de projet</h4>
        <div className="chef">
            <img src={profilepng}/>
            <h5>{chef.nom}</h5>
        </div>
          
        <h4>Membres</h4>
            <div className="membresProjet">
                {membres.map((membre) => {
                    return (
                        <div key={membre.id_membre} className="membreProjet">
                            <img src={profilepng} />
                            <h5>{membre?.nom}</h5>
                        </div>
                    )
                })}
          </div>

          <div className="detailProjet">
              <div className='detailProjet1'>
                  <h4>Date de creation</h4>
                  <h5>{dateCreation}</h5>
                  <h4>dete de debut</h4>
                  <h5>{dateDebut}</h5>
                  <h4>Projet</h4>
                  <h5>{projet.nom}</h5>
                </div>
              <div className='detailProjet2'>
                  <h4>date de realisation estimee</h4>
                  <h5>{dateFin}</h5>

                  <h4>Statut</h4>
                  <h5 className='statut border-2 border-indigo-400 rounded'>{statues.find((s)=>s.id==statut).nom}</h5>

                  <h4>Cout</h4>
                  <h5>00</h5>
              </div>
          </div>
          <div className="actions-projet">
                <Trash size="32" color="#ff0000" onClick={()=>openDeleteTaskModal(id)} />
                <ReceiptText
                      size="32" color="#ff8a65" onClick={() => openDescriptionModal(description)}
                  />
                <Edit size="32" color="#ba68c8" onClick={() =>
                    {
                        setEditTaskModalIsOpen(!editTaskModalIsOpen)
                        setIdTache(id)
                    }}
                  />
          </div>
          </div>
          
      </>
  )
}
export default memo(TaskCard)