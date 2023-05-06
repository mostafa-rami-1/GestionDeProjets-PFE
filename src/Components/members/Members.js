import React, {memo ,useEffect,useState,useContext,useCallback} from 'react'

import { useTranslation } from 'react-i18next';

import MembreCard from './MembreCard';
import axiosClient from '../../axios';
import { StateContext } from '../../ContextProvider';
import EditMembre from '../modals/edit/editMembre/EditMembre';
import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

import './members.css'
import DeleteMembre from '../modals/delete/deleteMembre/DeleteMembre';


const Members = () => {
  const { t } = useTranslation()
  
  const { membres ,setMembres,isMembersFetched,setIsMembersFetched} = useContext(StateContext)
  const [membresFetched, setMembresFteched] = useState(membres)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")))

  const fetchMembres = useCallback(()=>axiosClient.get("/membres"),[])
  useEffect(() => {
    initTE({ Modal, Ripple });
      async function getMembres() {
        try {
          const data = await fetchMembres()
          setIsMembersFetched(true)
          setMembres(data.data)
          setMembresFteched(data.data)
        }
        catch (error) {
          console.log("");
        }
      }
      getMembres()
    
  }, [isMembersFetched])

  return (
    <div className='content-container'>
      <div className="text-neutral-700 dark:text-neutral-300 ">
       <div className="grid gap-4 md:grid-cols-4 text-center">
        {membresFetched.length > 0 && membresFetched.map((m) => {
          return (currentUser.id_membre!==m.id_membre && <MembreCard key={m.id_membre}
            id={m.id_membre}
            nom={m.nom}
            prenom={m.prenom}
            tel={m.telephone}
            email={m.email}
            photo={m.image}
            designation={m.designation.nom}
            role={m.role}
            image={m.image}
          />)
        })}
        
        </div>
      </div>
      <EditMembre />
      <DeleteMembre/>
    </div>
  )
}

export default memo(Members)