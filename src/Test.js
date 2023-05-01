import React from "react";
import { useEffect ,useState ,useContext} from "react";
import axiosClient from "./axios";
import { StateContext } from "./ContextProvider";

export const Test = () => {
     const [upImage, setUpImage] = useState(null);
    const [name, setName] = useState("")
    const {setRefresh ,refresh}= useContext(StateContext)

    const  handleFileChange=(e)=> {
        setUpImage(e[0])
    }

    const handleSubmit = (e) => {
        const image = new FormData()
        image.append("image", upImage)
        image.append("name",name)
        image.append("_method", "patch")
        e.preventDefault();
        axiosClient.post("/membres/17", image ).then((response) => { 
            console.log(response.data);
        }).catch((err) => {console.log(err.response.data); })
    }
    const handlName = (e) => {
        setName(e.target.value)
    }
    
    
    return(
        <div style={{height:100,width:400,zIndex:2}}>
            <form method='post'  encType="multipart/form-data" onSubmit={(e)=>handleSubmit(e)}>
                <input type="file" name="image" onChange={(e) => handleFileChange(e.target.files)} />
                <input type="text" name='name' value={name} onChange={(e)=>handlName(e)} />
                <button type="submit" onClick={(e)=>handleSubmit(e)}>Update Profile Image</button>
            </form>
        </div>
    )
}


/*
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Outlet ,Routes ,Route , Navigate } from 'react-router-dom'
import { Dashboard } from './Components/dashboard/Dashboard'
import { Main } from './layout/main/Main'
import { Members } from './Components/members/Members'
const App = () => {
  return (
      <div>
          <BrowserRouter>
            <Routes>
                  <Route element= {<Main/>}>
                      <Route path='/' element= {<Navigate to={"/dashboard"} replace />}></Route>
                      <Route path='/dashboard' element= {<Dashboard/>}></Route>
                      <Route path='/members' element= {<Members/>}></Route>
                  </Route>
            </Routes>
          </BrowserRouter>
    </div>
  )
}
 export default App*/

const DummyProjectData=[
    {
        "Nom" :"gestion de voiture",
        "Chef de projet" :"mostafa rami",
        "Categorie" : "application desktop",
        "Client" : "mostafa rami",
        "Creation":"12-11-2022",
        "Statut" : "Active",
    }
]

/*

"SQLSTATE[42S22]: 
Column not found: 1054 Unknown column 'roles.id' in 'where clause' (Connection: mysql, SQL: select * from `roles` where `roles`.`id` = 1 limit 1)"
*/


// const [data,setData]= useState(null)
//   const [currentPage,setCurrentPage]=useState(1)
  
//   useEffect(() => {
//     axiosClient.get(`/projets?page=${currentPage}`).then((response) => {
//       setData(response.data.data);
//       console.log(response.data);
//     });
//   },[currentPage])