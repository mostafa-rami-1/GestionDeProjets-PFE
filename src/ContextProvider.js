import React, { useState,createContext   } from 'react'
import { memo } from 'react'


export const StateContext = createContext({
    isLoading: true,
    setIsLoading: () => { },
    
    
    membre: {},
    setMembre:()=>{},
    currentUser: {},
    setCurrentUser: () => { },

    userToken: "",
    setUserToken: () => { },
    
    projets: [],
    setProjets: () => { },

    taches: [],
    setTaches: () => { },

    membres: [],

    setMembres: () => { },
    
    categories:[],
    setCategories: () => { },
    clients: [],
    setClients: () => { },
    
    designations: [],
    setDesignations : ()=>{},

    dataFetched: false,
    setDataFetched: () => { },

    refresh: false,
    setRefresh: () => { },
    addModalIsOpen: false,
    setAddModalIsOpen:()=>{},

    deleteModaIsOpen: false,
    setDeleteModalIsOpen: () => { },

    descriptionModalIsOpen: false,
    setDescriptionModalIsOpen: () => { },

    editModalIsOpen: false,
    setEditModalIsOpen : () =>{},

    projectDescription: "",
    setProjectDescription: () => { },

    taskDescription: "",
    setTaskDescription:()=>{},

    addTaskModalIsOpen: false,
    setAddTaskModalIsOpen:()=>{},

    editTaskModalIsOpen:false,
    setEditTaskModalIsOpen: () => { },
    
    deleteTaskModalIsOpen: false,
    setDeleteTaskModalIsOpen: () => { },
    
    editMemberModalIsOpen: false,
    setEditMemberModalIsOpen:()=>{},

    idProjet: null,
    setIdProjet: () => { },

    idTache:null,
    setIdTache: () => { },

    idMembre: null,
    setIdMembre:()=>{},

    chefProjet: {},
    setChefProjet: () => { },

    role: null,
    setRole : ()=>{},
    
    path: window.location.pathname.split("/")[1],
    setPath: () => { },
    isMembersFetched:false,
    setIsMembersFetched: () => { },
    
    profileModalIsOpen: false,
    setProfileModalIsOpen: () => { },

    editProfileModalIsOpen: false,
    setEditProfileModalIsOpen: () => { },
    
    idCategorie:false,
    setIdCategorie: () => { },

    editCategorieModalIsOpen: false,
    setEditCategorieModalIsOpen: () => { },

    idDesignation: null,
    setIdDesignation: () => { },
    editDesignationModalIsOpen: false,
    setEditDesignationModalIsOpen: () => { },
    
    idClient: null,
    setIdClient: () => { },
    
    editClientModalIsOpen: false,
    setEditClientModalIsOpen: () => { },
    deleteClientModalIsOpen: false,
    setDeleteClientModalIsOpen: () => { },
    addClientModalIsOpen: false,
    setAddClientModalIsOpen:()=>{}
})

const ContextProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false)
    const [currentUser, _setCurrentUser] = useState({})
    const [userToken, _setUserToken] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [isMembersFetched, setIsMembersFetched] = useState(false)


    
    //modals
    const [profileModalIsOpen, setProfileModalIsOpen] = useState(false)
    const [languageModaIsOpen, setLanguageModalIsOpen] = useState(false)
    const [addModalIsOpen,setAddModalIsOpen]=useState(false)
    const [deleteModaIsOpen, setDeleteModalIsOpen] = useState(false)
    const [descriptionModalIsOpen, setDescriptionModalIsOpen] = useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)
    const [editProfileModalIsOpen,setEditProfileModalIsOpen]=useState(false)

    const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false)
    const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false)
    const [deleteTaskModalIsOpen, setDeleteTaskModalIsOpen] = useState(false)
    const [editMemberModalIsOpen, setEditMemberModalIsOpen] = useState(false)
    const [taskDescription,setTaskDescription]=useState("")
    
    const [projets ,setProjets] = useState([])
    const [taches ,setTaches] = useState([])
    const [membres, setMembres] = useState([])
    const [categories, setCategories] = useState([])
    const [clients, setClients] = useState([])
    const [role, setRole] = useState(null)
    const [chefProjet,setChefProjet]= useState({})
    const [idProjet, setIdProjet] = useState(null)
    const [idTache, setIdTache] = useState(null)
    const [idMembre, setIdMembre] = useState(null)
    const [idClient,setIdClient]=useState(null)
    const [membre, setMembre] = useState({})
    const [designations, setDesignations] = useState([])
    const [idDesignation, setIdDesignation] = useState(null)
    const [editDesignationModalIsOpen,setEditDesignationModalIsOpen]=useState(false)

    const [projectDescription, setProjectDescription] = useState("")
    const  [dataFetched,setDataFetched] = useState(false	)
    const [path, setPath] = useState(window.location.pathname.split("/")[1])

    const [idCategorie, setIdCategorie] = useState(null)
    const [editCategorieModalIsOpen, setEditCategorieModalIsOpen]=useState(false)
    
    const [addClientModalIsOpen, setAddClientModalIsOpen] = useState(false)
    const [deleteClientModalIsOpen, setDeleteClientModalIsOpen] = useState(false)
    const [editClientModalIsOpen,setEditClientModalIsOpen]=useState(false)
    
     

    const setUserToken = (token) => { 
        _setUserToken(token)
    }
    const setCurrentUser = (user) => {
        _setCurrentUser(user)
    }
  
    return (
        <StateContext.Provider value={{
            isLoading,
            setIsLoading,

           

            currentUser,
            setCurrentUser,

            userToken,
            setUserToken,

            profileModalIsOpen,
            setProfileModalIsOpen,

            languageModaIsOpen,
            setLanguageModalIsOpen,

            projets,
            setProjets,

            taches,
            setTaches,

            membres,
            setMembres,

            categories,
            setCategories,

            designations,
            setDesignations,

            clients,
            setClients,

            
            dataFetched,
            setDataFetched,

            refresh,
            setRefresh,
            
            role,
            setRole,

            addModalIsOpen,
            setAddModalIsOpen,
            
            deleteModaIsOpen,
            setDeleteModalIsOpen,

            descriptionModalIsOpen,
            setDescriptionModalIsOpen,

            editModalIsOpen,
            setEditModalIsOpen,

            editTaskModalIsOpen,
            setEditTaskModalIsOpen,
            addTaskModalIsOpen,
            setAddTaskModalIsOpen,
            deleteTaskModalIsOpen,
            setDeleteTaskModalIsOpen,
            taskDescription,
            setTaskDescription,

            editMemberModalIsOpen,
            setEditMemberModalIsOpen,

            projectDescription,
            setProjectDescription,
           
            idProjet,
            setIdProjet,

            idTache,
            setIdTache,
            
            idMembre,
            setIdMembre,

            idCategorie,
            setIdCategorie,
            
            membre,
            setMembre,
            
            chefProjet,
            setChefProjet,
            
            path,
            setPath,
            isMembersFetched,
            setIsMembersFetched,
            editProfileModalIsOpen,
            setEditProfileModalIsOpen,
            editCategorieModalIsOpen,
            setEditCategorieModalIsOpen,
            
            idDesignation,
            setIdDesignation,
            editDesignationModalIsOpen,
            setEditDesignationModalIsOpen,

            idClient,
            setIdClient,
            addClientModalIsOpen,
            setAddClientModalIsOpen,
            deleteClientModalIsOpen,
            setDeleteClientModalIsOpen,
            editClientModalIsOpen,
            setEditClientModalIsOpen

        }}>
            {children}
        </StateContext.Provider>
    )
}
 
//export const useStateContext =()=> useContext(StateContext)
export default memo(ContextProvider)