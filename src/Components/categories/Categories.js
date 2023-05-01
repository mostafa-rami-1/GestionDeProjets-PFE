import React ,{useEffect} from 'react'
import { Main } from '../../layout/main/Main'
import { useTranslation } from 'react-i18next';
import axiosClient from '../../axios';
import { memo } from 'react';

const Categories = () => {
  const { t } = useTranslation()
  useEffect(() => {
  //   axiosClient.post("/membres/62", {
  //     "nom":"mostafa"
  //   }).
  //     then((response) => { console.log(response.data) })
  //     .catch((err)=>console.log(err.response.data))

  //       // axiosClient.get("/membres/62").then((response) => { 
  //       //     console.log(response.data);
  //       // })
  }, [])
  // useEffect(() => {
  //       if (editModalIsOpen) {

            
  //           setLoading(true)
            
            
  //           axiosClient.get("/categories").then((response) => {
  //                   setLoading(false)
  //                   setCategories(response.data);
  //           }).catch((error) => { console.log(error.response.data)})
            
  //           axiosClient.get(`/clients`).then((response) => {
  //                       setClients(response.data);
  //           }).catch((error) => { console.log(error.response.data); })
  //        }
  //   },[editModalIsOpen])
  return (
    <>
      <h1>{t("Categories")}</h1>
    </>
  )
}

export default memo(Categories)
