import React,{useState,memo, useContext} from 'react'
import {data} from "./sidebarData"
import "./sidebar.css"
import logoIcon from "../../assets/logoIcon.png"
import { Link } from "react-router-dom"
import { useTranslation } from 'react-i18next';
import { StateContext } from '../../ContextProvider'


const SideBarx = () => {
   const { t } = useTranslation();

   const [selected, setSelected] = useState(0)
  //const [path, setPath] = useState(window.location.pathname.split("/")[1])
    const {path,setPath}= useContext(StateContext)
  
    return (
      <div className='sidebar'>
          <div className="logo">
              <img src={logoIcon} alt="" className='logoIcon'/>
              <p className='NomLogo'>GestionProjet</p>
          </div>
      <ul>
              {data.map((element,index) => {
                  return (
                    <Link
                      to={`/${element.link}`}
                      onClick={() => {
                        setSelected(index)
                        setPath(element.link)
                      }} className={path===element.link?"sidebarItem itemSelected":"sidebarItem"} key={index}
                    >
                          <element.icon color={path===element.link?"#fff":"#8A4DD9"} size={20} />
                              <p
                                  className='sidebarItemText'
                                  style={path === element.link ? { color: '#fff' } : { color: "#000" }}>
                                  {t(element.title)}
                              </p>
                    </Link>
                  )
              })}
          </ul>
    </div>
  )
}
const SideBar = React.memo(() => {
  return (<SideBarx/>)
})
export default memo(SideBar)