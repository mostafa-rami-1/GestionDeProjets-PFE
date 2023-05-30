import React ,{useState, useEffect,useContext,memo,useCallback}  from 'react'
import { useTranslation } from 'react-i18next';
import Stats from "./Stats";
import Cards  from "./Cards";
import axiosClient from '../../axios'
import LoadingMarkup from '../loader/LoadingMarkup'
import { StateContext } from '../../ContextProvider'
import "./dash.css"
import PdfButton from '../sub-components/PdfButton';
import ProjectsPerMonth from './ProjectsMonths';
import ProjectsPerCatg from './ProjectsPerCatg';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const Dashboard = () => {
    const [projectPerMonth, setProjectPerMonth] = useState({ labels: [], datasets: [] });
    const [projectPerCategorie, setProjectPerCategorie] = useState({ labels: [], datasets: [] })
    const [pCountsCat, setPCountsCat] = useState([])
    const [pCountsMois,setCountsMois]=useState([])
    for (let i = 0; i < 12; i++) {
        if (pCountsMois[i] === undefined) {
            pCountsMois[i] = 0;
        }
    }
    for (let i = 0; i < 12; i++) {
        if (pCountsCat[i] === undefined) {
            pCountsCat[i] = 0;
        }
    }
    const [loading, setLoading] = useState(false)
    const fetchMembres = useCallback(() => axiosClient.get(`/membres`), []);
    const fetchProjets = useCallback(() => axiosClient.get(`/projets`), []);
    const fetchTasks = useCallback(() => axiosClient.get(`/taches`), []);
    const fetchClients = useCallback(() => axiosClient.get(`/clients`), []);
    const fetchCategories = useCallback(() => axiosClient.get(`/categories`), []);
    const fetchDesignations = useCallback(() => axiosClient.get(`/designations`), []);
    
    const {
        projets,
        setProjets,
        setTaches,
        setMembres,
        dataFetched,
        setDataFetched,
        setClients,
        setDesignations,
        setCategories,
        taches,
        clients,
        membres,
        categories,
        designations
    } = useContext(StateContext)
    console.log(taches);
    const projetsAchevés = projets.filter((p) => p.statut === 2).length
    const projetsEnCourse = projets.filter((p) => p.statut === 1).length
    const projetsNonAchevés = projets.filter((p) => p.statut === 0).length

    const tachesAchevés = taches.filter((t) => t.statut === 2).length
    const tachesEnCourse = taches.filter((t) => t.statut === 1).length
    const tachesNonAchevés = taches.filter((t) => t.statut === 0).length

    const { t } = useTranslation()

    useEffect(() => {
       
    },[])
    useEffect(() => {
        if (dataFetched === false || !projets.length>0 ) {
            setLoading(true)
            Promise.all([fetchProjets(), fetchMembres(), fetchTasks(),fetchClients(),fetchCategories(),fetchDesignations()])
            .then((responses) => {
                const [projetsResponse, membresResponse, tasksResponse,clientsResponse,categoriesResponse,designationsResponse] = responses;
                setProjets(projetsResponse.data)
                setMembres(membresResponse.data)
                setTaches(tasksResponse.data)
                setClients(clientsResponse.data)
                setCategories(categoriesResponse.data)
                setDesignations(designationsResponse.data)
                setDataFetched(true)
            })
            .catch((error) => { console.log(error.response.data) })
            .finally(() => setLoading(false));
        }
    }, [dataFetched, projets]);
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axiosClient.get('/number_projects_per_month');
                const projectData = response.data;
                const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                const counts = projectData.map((entry) => entry.count);
                setCountsMois(projectData.map((entry) => entry.count))
                setProjectPerMonth({
                    labels,
                    datasets: [
                        {
                            fill: true,
                            label: 'Project Count',
                            data: counts,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },

                    ],
                });
            } catch (error) {
                console.error('Error fetching project count data:', error);
            }

            axiosClient.get("/number_projects_per_categorie").then((r) => {
                const labels = r.data.map((e) => e.category_name)
                const projets = r.data.map((e) => e.project_count)
                setPCountsCat(r.data.map((e) => e.project_count))

                setProjectPerCategorie({
                    labels,
                    datasets: [
                        {
                            fill: true,
                            label: 'Project Count',
                            data: projets,
                            borderColor: '#ff6360',
                            backgroundColor: '#ff6360',
                        },

                    ],
                });
            })
        };

        fetchData();
    }, []);
    const downloadPdf = () => {
        const doc = new jsPDF();

        // Define the table columns
        const projectsColumns = [
            { header: 'ID', dataKey: 'id_projet' },
            { header: 'Nom', dataKey: 'nom' },
            { header: 'Categorie', dataKey: 'categorie' },
            { header: 'Chef Projet', dataKey: 'chef_projet' },
            { header: 'Client', dataKey: 'client' },
            { header: 'Cout(MAD)', dataKey: 'cout' },
            { header: 'Date Debut', dataKey: 'date_debut' },
            { header: 'Date Livraison', dataKey: 'date_livraison' },
            { header: 'Statut', dataKey: 'statut' },
            { header: 'Membres', dataKey: 'membres' },
            { header: 'Taches', dataKey: 'taches' },
        ];

        // Define the table rows
        const projectsRows = projets.map((item) => ({
            id_projet: item.id_projet,
            nom: item.nom,
            categorie: item.categorie.nom,
            chef_projet: item.chef_projet.nom,
            client: item.client.nom,
            cout: item.cout,
            date_debut: item.date_debut,
            date_livraison: item.date_livraison,
            statut:
                item.statut === 0
                    ? 'Non réalisé'
                    : item.statut === 1
                        ? 'En cours'
                        : 'Réalisé',
            membres: item.membres.length,
            taches: item.taches.length,
        }));

        const tachesColumns = [
            { header: 'ID', dataKey: 'id_tache' },
            { header: 'Nom', dataKey: 'nom' },
            { header: 'Projet', dataKey: 'projet' },
            { header: 'Chef Projet', dataKey: 'chef_projet' },
            { header: 'Date Debut', dataKey: 'date_debut' },
            { header: 'Date Fin', dataKey: 'date_fin' },
            { header: 'Statut', dataKey: 'statut' },
            { header: 'Membres', dataKey: 'membres' },
        ];
        const tachesRows = taches.map((item) => ({
            id_tache: item.id_tache,
            nom: item.nom,
            projet: item.projet.nom,
            chef_projet: item.projet.chef_projet.nom,
            date_debut: item.date_debut,
            date_fin: item.date_fin,
            statut:
                item.statut === 0
                    ? 'Non réalisé'
                    : item.statut === 1
                        ? 'En cours'
                        : 'Réalisé',
            membres: item.membres.length,
        }));

        const membresColumns = [
            { header: 'ID', dataKey: 'id_membre' },
            { header: 'Prenom', dataKey: 'prenom' },
            { header: 'Nom', dataKey: 'nom' },
            { header: 'Email', dataKey: 'email' },
            { header: 'Telephone', dataKey: 'telephone' },
            {header:"Role",dataKey:"role"}
        ]
        const membresRows = membres.map((item) => ({
            id_membre: item.id_membre,
            prenom: item.prenom,
            nom: item.nom,
            email: item.email,
            telephone: item.telephone,
            role:item.role.id_role===1?"Admin":item.role.id_role===2?"Chef de projet":"Membre"
        }));
       

        const clientsColumns = [
            { header: 'ID', dataKey: 'id_client' },
            {header:'Prenom',dataKey:'prenom'},
            { header: 'Nom', dataKey: 'nom' },
            { header: 'Email', dataKey: 'email' },
            { header: 'Telephone', dataKey: 'telephone' },
        ]

        const clientsRows = clients.map((item) => ({
            id_client: item.id_client,
            prenom: item.prenom,
            nom: item.nom,
            email: item.email,
            telephone:item.telephone   
        }));
        const tablesData = [
            {
                title: 'total',
                headers: ['Projets', 'Taches', 'Clients', 'Membres', 'Categories', 'Designations'],
                data: [[projets.length, taches.length, clients.length, membres.length, categories.length, designations.length]],
            },
            {
                title: 'Statistiques de projets',
                headers: ['Non réalisé', 'En cours', 'Réalisé'],
                data: [[projetsNonAchevés, projetsEnCourse, projetsAchevés]],
            },
            {
                title: 'Statistiques de taches',
                headers: ['Non réalisé', 'En cours', 'Réalisé'],
                data: [[tachesNonAchevés, tachesEnCourse, tachesAchevés]],
            },
            {
                title: 'Nombre de projets par categorie',
                headers: categories.map((c) => c.nom),
                data: [pCountsCat],
            },
            {
                title: 'Nombre de projets par mois',
                headers: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
                data: [pCountsMois],
            },
        ];

        // Set the initial y position
        let yPos = 10;

        // Loop through each table
        tablesData.forEach((tableData) => {
            const { title, headers, data } = tableData;

            // Add table title
            doc.setFontSize(14);
            doc.text(title, 10, yPos);
            yPos += 10;

            // Generate the table
            doc.autoTable({
                startY: yPos,
                head: [headers],
                body: data,
            });

            // Calculate the table height for the next positioning
            const table = doc.previousAutoTable.finalY + 10;

            // Check if there is enough space for the next table
            if (table > doc.internal.pageSize.height - 10) {
                doc.addPage();
                yPos = 10;
            } else {
                yPos = table;
            }
        });

        // Add title for the "Projets" table
        function addTable(text, rows, columns, theme = "grid") {
            doc.setFontSize(14);
            doc.text(text, 10, yPos);
            yPos += 10;
            const marginTop = 1
            doc.autoTable({
                startY: yPos + marginTop,
                theme,
                columns,
                body: rows,
            });

            // Calculate the table height for the next positioning
            const prTable = doc.previousAutoTable.finalY + 10;

            // Check if there is enough space for the next table
            if (prTable > doc.internal.pageSize.height - 10) {
                doc.addPage();
                yPos = 10;
            } else {
                yPos = prTable;
            }
        }
        addTable("Projets",projectsRows,projectsColumns)
        addTable("Taches", tachesRows, tachesColumns)
        addTable("Membres", membresRows, membresColumns)
        addTable("Clients",clientsRows,clientsColumns)

        // Save the PDF
        doc.save('multi-tables.pdf');
    }


    return (
            <>
            <h1>{t("Tableau de bord")}</h1>
            <div className="flex justify-end align-middle">
                
                <PdfButton title={"Rapport"} onclick={downloadPdf} />
            </div>
            {(loading && projets.length>0) ? <div className='loader'><LoadingMarkup /></div>
                : (
                    <>
                        <Cards />

                        <div className="flex justify-around gap-3 mt-3">
                            <Stats />
                            <div className="stats">
                                <ProjectsPerMonth data={projectPerMonth} />
                                <ProjectsPerCatg data ={projectPerCategorie} />
                            </div>
                        </div>

                    </>
                )}
            </>
    )
}

export default memo(Dashboard)