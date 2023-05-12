

import React, {useContext,memo,useState} from 'react'
import { LanguageSquare , ArrowDown2} from "iconsax-react"
import ProfileModal from '../../Components/modals/ProfileModal'
import LanguageModal from '../../Components/modals/LanguageModal'
import { useTranslation } from 'react-i18next';
import {StateContext} from "../../ContextProvider";
import { useAuthUser } from 'react-auth-kit'
import profilepng from '../../assets/Profile.png'
import "./nav.css"
import Profile from '../../Components/profile/Profile';




const Nav = () => {
  let { navRef,  profileModalIsOpen,
    setProfileModalIsOpen, languageModaIsOpen,
    setLanguageModalIsOpen, refresh ,idMembre,setIdMembre} = useContext(StateContext)
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")))

  const user = useAuthUser() || {}
  let userImg = profilepng
  if (user()?.image) {
    const imgpath = user()?.image.replace("public", "storage") 
    userImg = `http://127.0.0.1:8000/${imgpath}`
  }
  const profileModalHandler = () => {
    setProfileModalIsOpen(!profileModalIsOpen)
  }
  const languageModalHandler = () => {
    setLanguageModalIsOpen(!languageModaIsOpen)
  }
  const {t}= useTranslation()

  return (
    <>
      <nav className='nav' ref={navRef}>
        <div className="navItems">
          <div className="lang" onClick={languageModalHandler}>
            <p id='lang'>{t("lng") }</p>
            <LanguageSquare color="#000" size={19} />
            {languageModaIsOpen && <LanguageModal/>}
          </div>

          <div className="profile" id='profile' onClick={profileModalHandler}>
            <p id='profileName'>{(user()?.prenom || "name")}</p>
            <img id='profileImage' height={32} width={32}
                alt="Profile"  src={userImg} />
            <ArrowDown2 size="24" color="#000" id='profileArrow' />
          {profileModalIsOpen && <ProfileModal/> }
          </div>
        </div>
      </nav>
      <Profile />
    </>
    //
  )
}

export default memo(Nav)