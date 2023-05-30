import React , {useContext,memo} from "react";
import {StateContext} from '../../ContextProvider'
import Card from "./Card";
const Cards = () => {
    const {projets,taches,membres,categories,clients,designations}=useContext(StateContext)
    
    return(
        <div className="cards justify-start gap-x-20 align-middle flex-wrap">
            <Card name="Projets" type="projectsCard" num={projets.length} path="/projects" />
            <Card name="Taches" type="tasksCard" num={taches.length} path="/tasks"/>
            <Card name="Membres" type="membersCard" num={membres.length} path="/members" />
            <Card name="Categories" type="categoriesCard" num={categories.length} path="/categories" />
            <Card name="Clients" type="clientsCard" num={clients.length} path="/clients" />
            <Card name="Designations" type="designationsCard" num={designations.length} path="/designations" />
           
        </div>
    )
}
export default memo(Cards)