import React,{useContext,memo, useState} from 'react'
import profilepng from '../../assets/Profile.png'
import {Trash ,ReceiptText,Edit} from "iconsax-react"
import { StateContext } from '../../ContextProvider'
import statues from './ProjectStatus'





const ProjectCard = ({ id, nom, chef, description, membres, dateCreation, dateLivraison, categorie, client, statut, cout }) => {
    const [currentUser , setCurrentUser]= useState(JSON.parse(localStorage.getItem("currentUser")))
   

    
    const { deleteModaIsOpen, setDeleteModalIsOpen ,descriptionModalIsOpen,setDescriptionModalIsOpen,editModalIsOpen,setEditModalIsOpen,setProjectDescription,setIdProjet} = useContext(StateContext)
    const openDeleteModal = (id) => {
        setIdProjet(id)

        setDeleteModalIsOpen(!deleteModaIsOpen)
    }
    const openDescriptionModal = (desc) => { 
        setProjectDescription(desc)
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
                        <div key={membre.nom} className="membreProjet">
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
                  <h4>Categorie</h4>
                  <h5>{categorie}</h5>
                  <h4>Client</h4>
                  <h5>{client}</h5>
                </div>
              <div className='detailProjet2'>
                  <h4>Date de livraison</h4>
                  <h5>{dateLivraison}</h5>

                  <h4>Statut</h4>
                  <h5 className='statut'>{statues.find((s)=>s.id==statut).nom}</h5>

                  <h4>Cout</h4>
                  <h5>{cout}</h5>
              </div>
          </div>
          <div className="actions-projet">
            {(localStorage.getItem("role") === "admin" || chef.id_membre===currentUser.id_membre)
                &&
                      <Trash size="32" color="#ff0000" onClick={() => {
                       
                          openDeleteModal(id)
                      }}
            />}
                  
            <ReceiptText
                    size="32" color="#ff8a65" onClick={() => openDescriptionModal(description)}
                  />
                  
            {(localStorage.getItem("role")==="admin" || chef.id_membre===currentUser.id_membre) &&
            <Edit size="32" color="#ba68c8" onClick={() =>
                {
                    setEditModalIsOpen(!editModalIsOpen)
                    setIdProjet(id)
            }} />}
          </div>
          </div>
          
      </>
  )
}
export default memo(ProjectCard)