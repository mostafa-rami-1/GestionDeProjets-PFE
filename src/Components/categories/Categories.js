import React ,{useContext, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next';
import axiosClient from '../../axios';
import { memo } from 'react';
import { Trash, Edit, AddCircle } from "iconsax-react"
import { StateContext } from '../../ContextProvider';
import DeleteCategorie from '../modals/delete/DeleteCategorie';
import EditCategorie from '../modals/edit/EditCategorie';
import {
  Input,
  initTE,
} from "tw-elements";
import Search from '../sub-components/search/Search'


import AddCategorie from '../modals/add/AddCategorie';


const Categories = () => {
  const { t } = useTranslation()

  const { categories, setCategories ,setDeleteModalIsOpen , setIdCategorie ,refresh,setEditCategorieModalIsOpen,setEditModalIsOpen} = useContext(StateContext)
  const [fetchedCategories, setFetchedCategories] = useState(categories)
  const [loading, setLoading]= useState(false)
 
  useEffect(() => {    
    initTE({ Input });

      setLoading(true)        
      axiosClient.get("/categories").then((response) => {
        setLoading(false)
        setCategories(response.data);
        setFetchedCategories(response.data)
      }).catch((error) => { console.log(error.response.data) })
  }, [refresh]) 
  const searchCategorie = (e) => {
    setFetchedCategories(categories.filter((c) => (c.nom.toLocaleLowerCase().includes(e))))
  }
  
  return (
    <>
      <h1>{t("Categories")}</h1>
      <Search searchCloser={searchCategorie} />
      {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet")
        &&
        <AddCategorie />
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
            

            {fetchedCategories.length > 0 && fetchedCategories.map((c) => {
              return (
                <tr key={c.id_categorie} className="border-b dark:border-neutral-500">
                  <td className=" px-6 py-4">{c.nom}</td>
                  <td className=" px-6 py-4 md:whitespace-normal whitespace-nowrap">
                    {c.description}
                  </td>
                  {(localStorage.getItem("role") === "admin" || localStorage.getItem("role") === "chef_de_projet") &&
                    <td className="cursor-pointer px-6  py-4 ">
                      <div className=" flex justify-center align-middle gap-3 flex-nowrap">
                        <Trash color='red' className=' hover:scale-125 active:scale-95'
                          onClick={() => {
                            setIdCategorie(c.id_categorie)
                            setDeleteModalIsOpen(true)
                          }}
                          size={20} />
                        < Edit color='orange'
                          className='hover:scale-110 active:scale-95'
                          size={20}
                          onClick={() => {
                            setIdCategorie(c.id_categorie)
                            setEditCategorieModalIsOpen(true)
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
        <DeleteCategorie />}
      {(localStorage.getItem("role") === "admin") &&
        <EditCategorie />}

      {(localStorage.getItem("role") === "admin")
        &&
        <div className="ajouter" onClick={() => setEditModalIsOpen(true)}>
          <AddCircle size="40" color='#8A4DD9' variant="Bulk" />
        </div>}
    </>
  )
}

export default memo(Categories)
