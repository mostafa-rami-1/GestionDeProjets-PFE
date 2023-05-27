import React ,{useState, useEffect,useContext,memo,useCallback}  from 'react'
import { useTranslation } from 'react-i18next';
import Stats from "./Stats";
import Cards  from "./Cards";
import axiosClient from '../../axios'
import LoadingMarkup from '../loader/LoadingMarkup'
import { StateContext } from '../../ContextProvider'
import "./dash.css"
import PdfButton from '../sub-components/PdfButton';

const Dashboard = () => {
    const [loading, setLoading] = useState(false)
    const fetchMembres = useCallback(() => axiosClient.get(`/membres`), []);
    const fetchProjets = useCallback(() => axiosClient.get(`/projets`), []);
    const fetchTasks = useCallback(() => axiosClient.get(`/taches`), []);
    const {
        projets,
        setProjets,
        setTaches,
        setMembres,
        dataFetched,
        setDataFetched,
    } = useContext(StateContext)

    const { t } = useTranslation()

    useEffect(() => {
       
    },[])
    useEffect(() => {
        
        if (dataFetched === false || !projets.length>0 ) {
            setLoading(true)
            Promise.all([fetchProjets(), fetchMembres(), fetchTasks()])
            .then((responses) => {
                const [projetsResponse, membresResponse, tasksResponse] = responses;
                setProjets(projetsResponse.data)
                setMembres(membresResponse.data)
                setTaches(tasksResponse.data)
                setDataFetched(true)
            })
            .catch((error) => { console.log(error.response.data) })
            .finally(() => setLoading(false));
        }
    }, [dataFetched ,projets]);

    return (
            <>
            <h1>{t("Tableau de bord")}</h1>
            <div className="flex justify-end align-middle">
                
                <PdfButton title={"Rapport"} />
            </div>
            {(loading && projets.length>0) ? <div className='loader'><LoadingMarkup /></div>
                : (
                    <>
                        <Cards/>
                        <Stats />
                    </>
                )}
            </>
    )
}

export default memo(Dashboard)