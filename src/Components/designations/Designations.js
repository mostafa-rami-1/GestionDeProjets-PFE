import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import axiosClient from '../../axios';
import { memo } from 'react';
import { Trash, Edit, AddCircle } from "iconsax-react"
import { StateContext } from '../../ContextProvider';
import {
  Input,
  initTE,
} from "tw-elements";
import Search from '../sub-components/search/Search'
import AddDesignation from '../modals/add/AddDesignation';
import DeleteDesignation from '../modals/delete/deleteDesignation';
import EditDesignation from '../modals/edit/EditDesignation';
import PdfButton from '../sub-components/PdfButton';

function Designations() {
  const { t } = useTranslation()
  const { designations, setDesignations, setIdDesignation, setDeleteModalIsOpen, refresh, setEditDesignationModalIsOpen, setEditModalIsOpen }=useContext(StateContext)

  const [fetchedDesignations, setFetchedDesignations] = useState(designations)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    initTE({ Input });

    setLoading(true)
    axiosClient.get("/designations").then((response) => {
      setLoading(false)
      setDesignations(response.data);
      setFetchedDesignations(response.data)
    }).catch((error) => { console.log(error.response.data) })
  }, [refresh]) 

  const searchDesignation = (e) => {
    setFetchedDesignations(designations.filter((d) => (d.nom.toLocaleLowerCase().includes(e))))
  }

  return (
    
    <>
      <h1>{t("Designation")}</h1>
     
      <div className="flex justify-between">
        <Search searchCloser={searchDesignation} />
        <PdfButton title={"PDF"} />
      </div>
      {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet")
        &&
        <AddDesignation />
      }
      <div className=" max-h-[80%] overflow-x-auto overflow-y-auto my-14">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr className=' sticky top-0 text-neutral-100 bg-purple-600 w-full my-0'>
              <th scope="col" className="px-6 py-4">Nom</th>
              <th scope="col" className="px-6 py-4">description</th>
              {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet") && <th scope="col" className="px-6 py-4">Action</th>
              }
            </tr>
          </thead>
          <tbody>


            {fetchedDesignations.length > 0 && fetchedDesignations.map((c) => {
              return (
                <tr key={c.id_designation} className="border-b dark:border-neutral-500">
                  <td className=" px-6 py-4">{c.nom}</td>
                  <td className=" px-6 py-4 md:whitespace-normal whitespace-nowrap">
                    {c.description}
                  </td>
                  {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet") &&
                    <td className="cursor-pointer px-6  py-4 ">
                      <div className=" flex justify-center align-middle gap-3 flex-nowrap">
                        <Trash color='red' className=' hover:scale-125 active:scale-95'
                          onClick={() => {
                            setIdDesignation(c.id_designation)
                            setDeleteModalIsOpen(true)
                          }}
                          size={20} />
                        < Edit color='orange'
                          className='hover:scale-110 active:scale-95'
                          size={20}
                          onClick={() => {
                            setIdDesignation(c.id_designation)
                            setEditDesignationModalIsOpen(true)
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
        <DeleteDesignation />}
      {(localStorage.getItem("role") === "admin") &&
        <EditDesignation />}

      {(localStorage.getItem("role") === "admin")
        &&
        <div className="ajouter" onClick={() => setEditModalIsOpen(true)}>
          <AddCircle size="80" color='#8A4DD9' variant="Bulk" />
        </div>}
    </>

  )
}
export default memo(Designations)