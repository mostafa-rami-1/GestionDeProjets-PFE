import React, {useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import axiosClient from '../../axios'
import { StateContext } from '../../ContextProvider'
import {
  Input,
  initTE,
} from "tw-elements";
import Search from '../sub-components/search/Search';
import { AddCircle, Edit, Trash } from 'iconsax-react';
import AddClient from '../modals/add/AddClient';
import DeleteClient from '../modals/delete/DeleteClient';
import EditClient from '../modals/edit/EditClient';
import PdfButton from '../sub-components/PdfButton';

const Clients = () => {
  const { t } = useTranslation()
  const { clients, setClients, setIdClient, refresh, setEditClientModalIsOpen,setAddClientModalIsOpen,setDeleteClientModalIsOpen } = useContext(StateContext)

  const [fetchedClients, setFetchedClients] = useState(clients)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    initTE({ Input });

    setLoading(true)
    axiosClient.get("/clients").then((response) => {
      setLoading(false)
      setClients(response.data);
      setFetchedClients(response.data)
    }).catch((error) => { console.log(error.response.data) })



    
  }, [])

  const searchClients = (e) => {
    setFetchedClients(clients.filter((c) => (c.nom.toLocaleLowerCase().includes(e))))
  }
  return (
    <>
      <h1>Clients</h1>
      
      <div className="flex justify-between">
        <Search searchCloser={searchClients} />
      </div>
      {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet")
        &&
        <AddClient />
      }
      {(localStorage.getItem("role") === "admin")
        &&
        <div className="ajouter" onClick={() => setAddClientModalIsOpen(true)}>
          <AddCircle size="80" color='#8A4DD9' variant="Bulk" />
        </div>}
      
      <div className=" max-h-[80%] overflow-x-auto overflow-y-auto">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr className=' sticky top-0 text-neutral-100 bg-purple-600 w-full my-0'>
              <th scope="col" className="px-6 py-4">Prenom</th>
              <th scope="col" className="px-6 py-4">Nom</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Telephone</th>
              {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet") && <th scope="col" className="px-6 py-4">Action</th>
              }
            </tr>
          </thead>
          <tbody>
            {fetchedClients.length > 0 && fetchedClients.map((c) => {
              return (
                <tr key={c.id_client} className="border-b dark:border-neutral-500">
                  <td className=" px-6 py-4">{c.prenom}</td>
                  <td className=" px-6 py-4">{c.nom}</td>
                  <td className=" px-6 py-4">{c.email}</td>
                  <td className=" px-6 py-4">{c.telephone}</td>
                 
                  {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet") &&
                    <td className="cursor-pointer px-6  py-4 ">
                      <div className=" flex justify-center align-middle gap-3 flex-nowrap">
                        <Trash color='red' className=' hover:scale-125 active:scale-95'
                          onClick={() => {
                            setIdClient(c.id_client)
                            setDeleteClientModalIsOpen(true)
                          }}
                          size={20} />
                        <Edit color='orange'
                          className='hover:scale-110 active:scale-95'
                          size={20}
                          onClick={() => {
                            setIdClient(c.id_client)
                            setEditClientModalIsOpen(true)
                          }}
                        />
                      </div>
                    </td>
                  }

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {(localStorage.getItem("role") === "admin") &&
        <DeleteClient />}
      {(localStorage.getItem("role") === "admin") &&
        <EditClient />}
    </>
  )
}

export default Clients