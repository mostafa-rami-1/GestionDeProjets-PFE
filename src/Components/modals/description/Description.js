import React, { useContext,memo, useState } from 'react'
import { StateContext } from '../../../ContextProvider'
import {Back} from "iconsax-react"

import './description.css'

export const Description = () => {
    const { descriptionModalIsOpen, setDescriptionModalIsOpen, projectDescription, taskDescription,setProjectDescription,setTaskDescription } = useContext(StateContext)
    return (
    <div className={descriptionModalIsOpen?'show':'hide'}>
            <div className='description'>
                <h4 id='description'>Description</h4>
                <span className='hide-description'
                    onClick={() => {
                        setTaskDescription("")
                        setProjectDescription("")
                        setDescriptionModalIsOpen(false)
                    }}
                ><Back size="32" color="#ff8a65" /></span>  
            <p id='description-paragraphe'>{projectDescription?projectDescription:taskDescription}</p>
        </div> 
      </div>
        
  )
}
