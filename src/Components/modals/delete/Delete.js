import React ,{useContext, useState , useRef} from 'react'
import { useTranslation } from 'react-i18next'
import './delete.css'
import { StateContext } from '../../../ContextProvider'
import axiosClient from '../../../axios'
import MiniLoader from '../../loader/MiniLoader'
const DeleteTask = ({ id }) => {
  const { deleteTaskModalIsOpen, setDeleteTaskModalIsOpen, idProjet ,refresh,setRefresh,setDataFetched } = useContext(StateContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const deleteProjectRef = useRef(null)
  const process = (id) => {
    deleteProjectRef.current.className="hide"
    setLoading(true)
    axiosClient.delete(`/projets/${id}`)
      .then((response) =>
        {
          setLoading(false)
          setMessage(response.data.message)
          setRefresh(!refresh)
          setDataFetched(false)
        }
     ).catch((error) =>{console.log(error);})
  }
  const annuler = () => {
    setDeleteTaskModalIsOpen(false)
  }
  const {t}=useTranslation()
  return (
    <div className={deleteTaskModalIsOpen?'show':'hide'}>
       <div   className='delete-modal'>
        <div ref={deleteProjectRef} className="actions-delete">
          <p>{t('voulez vous vraiment supprimer? ')}</p>
          <div className="actions-delete-btns">
            <button onClick={annuler} id="annuler-btn">Annuler</button>
            <button onClick={()=>process(idProjet)} id="delete-btn">Oui</button>
            </div>
        </div>
        <center>{loading && <MiniLoader />}
          {message &&
            <>
              <p id='delete-message'>{message}</p>
            <button id='ok-delete' onClick={() => {
              setDeleteTaskModalIsOpen(false)
              setMessage("")
              deleteProjectRef.current.className = "actions-delete"
            }}>OK</button>
            </>
          }
          
        </center>
    </div>
   </div>
  )
}

export default DeleteTask
