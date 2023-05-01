import React, { useContext,memo } from 'react'
import { StateContext } from '../../../ContextProvider'
import {Back} from "iconsax-react"

import './description.css'

export const Description = () => {
    const {descriptionModalIsOpen,setDescriptionModalIsOpen,projectDescription} = useContext(StateContext)
    return (
    <div className={descriptionModalIsOpen?'show':'hide'}>
            <div className='description'>
                <h4 id='description'>Description</h4>
                <span className='hide-description'
                    onClick={() => setDescriptionModalIsOpen(false)}
                ><Back size="32" color="#ff8a65" /></span>  
            <p id='description-paragraphe'>{projectDescription}</p>
        </div> 
      </div>
        
  )
}
