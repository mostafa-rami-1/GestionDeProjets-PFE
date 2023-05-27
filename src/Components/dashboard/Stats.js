import React,{useContext,memo} from "react";
import Stat  from "./Stat"

import {StateContext} from '../../ContextProvider'
import { useTranslation } from "react-i18next";
import { Doughnut,Pie } from "react-chartjs-2";





const Stats = () => {
    const { projets ,taches} = useContext(StateContext)
    const projetsAchevés = projets.filter((p) => p.statut === 2).length
    const projetsEnCourse = projets.filter((p) => p.statut === 1).length
    const projetsNonAchevés = projets.filter((p) => p.statut === 0).length

    const tachesAchevés = taches.filter((t) => t.statut === 2).length
    const tachesEnCourse = taches.filter((t) => t.statut === 1).length
    const tachesNonAchevés = taches.filter((t) => t.statut === 0).length
    const {t} = useTranslation()
    
    const tachesData = {
        labels: [t('tâches en Course'), t('tâches achevés'), t('tâches non achevés')],
        data : [tachesAchevés,tachesEnCourse,tachesNonAchevés]
    }
    const projetsData = {
        labels: [t('projets en Course'), t('projets achevés'), t('projets non achevés')],
        data: [projetsAchevés,projetsEnCourse,projetsNonAchevés]
    }


    return(
        <div className="stats">
            <Stat Type={Pie}  title={t("Statistiques de projets")} Data={projetsData} />

            <Stat Type={Doughnut} title={t("Statistiques de tâches")} Data={tachesData} />
            
        </div>
    )
}


export default memo(Stats)