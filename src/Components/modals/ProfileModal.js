import React, { useContext ,useState} from 'react'
import { Link} from "react-router-dom"
import { LogoutCurve, UserEdit } from "iconsax-react"
import { StateContext } from '../../ContextProvider'
import axiosClient from '../../axios'

import { useSignOut } from 'react-auth-kit'

const ProfileModal = () => {

  const signOut = useSignOut()
  
  const { setPath,setEditProfileModalIsOpen} = useContext(StateContext)
  const logout = () => {
    axiosClient.post("/logout").then(({ data }) => {
      setPath("dashboard")
      signOut()
    }).catch((error) => console.log(error.response.data.message))  
  }
  return (
    <div className="profileModal" id="modal">
      <Link to="#" className='toProfile' onClick={() => {
        setEditProfileModalIsOpen(true)
      }}>
        <UserEdit size="20" color="#fff"/>
        <p>profile</p>
      </Link>
      <button onClick={logout} className='logout'>
        <LogoutCurve  size="20" color="#fff"/>
        deconnexion
      </button>
    </div>
  )
}


export default ProfileModal