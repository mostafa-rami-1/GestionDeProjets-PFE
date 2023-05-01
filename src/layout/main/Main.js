import React,{useContext} from 'react'
import "./main.css"
import Nav from "../nav/Nav"
import SideBar from '../sidebar/SideBar'
import { Outlet } from 'react-router-dom'
import { memo } from 'react'


const Main = () => {
  return (
    <div className="mainLayout">
      <SideBar/>
      <Nav />
      <div className="main">
          <section >
              <Outlet></Outlet>
          </section>

      </div>
    </div>
  )
}
export default memo(Main)