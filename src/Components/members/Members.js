import React, { memo, useEffect, useState, useContext, useCallback } from 'react'

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
import { AddCircle } from 'iconsax-react';

import AddBtn from '../sub-components/AddBtn';
import AddMember from '../modals/add/AddMember';

import Search from '../sub-components/search/Search'
import PdfButton from '../sub-components/PdfButton';


const Members = () => {
  const { t } = useTranslation()

  const { membres, setMembres, isMembersFetched, setIsMembersFetched, setEditModalIsOpen } = useContext(StateContext)
  const [membresFetched, setMembresFteched] = useState(membres)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")))

  const fetchMembres = useCallback(() => axiosClient.get("/membres"), [])
  useEffect(() => {
    initTE({ Modal, Ripple });
    async function getMembres() {
      try {
        const data = await fetchMembres()
        setIsMembersFetched(true)
        setMembres(data.data)
        setMembresFteched(membres)
      }
      catch (error) {
        console.log("");
      }
    }
    getMembres()

  }, [isMembersFetched])

  const searchMembre = (e) => {
    setMembresFteched(membres.filter((m) => (m.nom.toLocaleLowerCase().includes(e))))
  }


  return (
    <>
      <h1>Membres</h1>
      <div className="flex justify-between">
        <Search searchCloser={searchMembre} />
      </div>

      <div className='content-container mt-0'>
        <div className="text-neutral-700 dark:text-neutral-300 ">
          <div className="grid gap-4 md:grid-cols-4 text-center">
            {membresFetched.length > 0 && membresFetched.map((m) => {
              return (currentUser.id_membre !== m.id_membre && <MembreCard key={m.id_membre}
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
        <DeleteMembre />
        <AddMember />
        {(localStorage.getItem("role") === "admin")
          &&
          <div className="ajouter" onClick={() => setEditModalIsOpen(true)}>
            <AddBtn bg={"white"} Icon={AddCircle} color="#ff0000" />
          </div>}
      </div>
    </>
  )
}

export default memo(Members)