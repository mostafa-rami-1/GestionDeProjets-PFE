import React , {useContext,memo} from "react";
import {StateContext} from '../../ContextProvider'
import Card from "./Card";
const Cards = () => {
    const {projets,taches,membres}=useContext(StateContext)
    
    return(
        <div className="cards">
            <Card name="Projets" type="projectsCard" num={projets.length} path="/projects" />
            <Card name="Taches" type="tasksCard" num={taches.length} path="/tasks"/>
            <Card name="Membres" type="membersCard" num={membres.length} path="/members" />
           
        </div>
    )
}
export default memo(Cards)