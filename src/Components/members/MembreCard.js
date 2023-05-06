import { Call, Component, Edit, Messages1, Trash } from 'iconsax-react'
import React, { useContext ,useState} from 'react'
import { StateContext } from '../../ContextProvider'
import Button from '../sub-components/Button'
import profileImg from '../../assets/Profile.png'
export default function MembreCard({ id, nom, prenom, tel, email, role, designation ,image}) {
    const { setIdMembre, setMembre , setDeleteModalIsOpen,setDataTeTarget } = useContext(StateContext)
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")))

    let bg
    let userImg
   
    switch (role.nom) { 
        case "admin":
            bg ="bg-red-500"
            break
        case "chef_de_projet":
            bg = "bg-cyan-500"
            break
        default:
            bg = "bg-purple-600"
            break;
    }

    if (image) {
        const imgpath = image.replace("public", "storage")
        userImg = `http://127.0.0.1:8000/${imgpath}`
    } else {
        userImg=profileImg
    }
  return (
   
            <div className=' scale-95'>
            <div
                className="block rounded-lg bg-white shadow-lg dark:bg-neutral-700 dark:shadow-black/30">
                <div className={`h-28 overflow-hidden rounded-t-lg ${bg}`}></div>
                <div
                className="mx-auto -mt-12 w-24 overflow-hidden rounded-full border-2 border-white bg-white dark:border-neutral-800 dark:bg-neutral-800">
                <img
                    src={userImg} />
                </div>
                <div className="p-6">
                  <h4 className="mb-4  font-semibold truncate text-lg">{nom} {prenom}</h4>
                  <h4 className={`mb-4  font-semibold truncate text-sm  text-center text-${bg}`}>{ role.nom==="chef_de_projet"?"chef de projet":role.nom}</h4>
                <hr />
              </div>
              <div className="flex gap-2 p-2">
                    <Call size="22" color="#555555" />
                  <p>{tel }</p>
                </div>
               <div className=" flex gap-1 p-2">
                    <Messages1 size="22" color="#555555"/>
                  <p className=' text-sm'>{email }</p>
              </div>
              <div className=" flex gap-1 p-2">
                    <Component size="22" color="#555555"/>
                  <p className=' text-sm'>{designation }</p>
              </div>
              {localStorage.getItem("role") === "admin"  && <div className="flex p-2 justify-end">
                  <Button bg={"white"} Icon={Edit} color="blue" type="m" onClick={() => {
                   
                      setIdMembre(id)
                  }} />
                  <Button bg={"white"} Icon={Trash} color="#ff0000" type="d" onClick={() => {
                      setIdMembre(id)
                      setDeleteModalIsOpen(true)
                  }} />
              </div>}
            </div>
            </div>

           
      
  )
}
