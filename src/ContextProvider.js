import React, { useState,createContext , useRef  } from 'react'
import { memo } from 'react'


export const StateContext = createContext({
    isLoading: true,
    setIsLoading: () => { },
    
    
    
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
    setClients:()=>{},

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
    setProjectDescription : () => { },

    idProjet: null,
    setIdProjet: () => { },
    
    path: window.location.pathname.split("/")[1],
    setPath : () => { },

})

const ContextProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false)
    const [currentUser, _setCurrentUser] = useState({})
    const [userToken, _setUserToken] = useState("")
    const [isLoading, setIsLoading] = useState(true)
   

    
    //modals
    const [profileModaIsOpen, setProfileModalIsOpen] = useState(false)
    const [languageModaIsOpen, setLanguageModalIsOpen] = useState(false)
    const [addModalIsOpen,setAddModalIsOpen]=useState(false)
    const [deleteModaIsOpen, setDeleteModalIsOpen] = useState(false)
    const [descriptionModalIsOpen, setDescriptionModalIsOpen] = useState(false)
    const [editModalIsOpen, setEditModalIsOpen] = useState(false)
    
    const [projets ,setProjets] = useState([])
    const [taches ,setTaches] = useState([])
    const [membres, setMembres] = useState([])
    const [categories, setCategories] = useState([])
    const [clients,setClients]=useState([])
    
   

    const [idProjet, setIdProjet] = useState(null)

    const [projectDescription, setProjectDescription] = useState("")
    const  [dataFetched,setDataFetched] = useState(false	)
    const [path , setPath ]= useState(window.location.pathname.split("/")[1])
    
     

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

            profileModaIsOpen,
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

            clients,
            setClients,

            
            dataFetched,
            setDataFetched,

            refresh,
            setRefresh,

            addModalIsOpen,
            setAddModalIsOpen,
            
            deleteModaIsOpen,
            setDeleteModalIsOpen,

            descriptionModalIsOpen,
            setDescriptionModalIsOpen,

            editModalIsOpen,
            setEditModalIsOpen,

            projectDescription,
            setProjectDescription,
           
            idProjet,
            setIdProjet,
            
            path,
            setPath
       
        }}>
            {children}
        </StateContext.Provider>
    )
}
 
//export const useStateContext =()=> useContext(StateContext)
export default memo(ContextProvider)