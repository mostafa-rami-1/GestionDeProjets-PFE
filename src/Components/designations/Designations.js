import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import axiosClient from '../../axios';
import { memo } from 'react';
import { Trash, Edit, AddCircle } from "iconsax-react"
import { StateContext } from '../../ContextProvider';
import DeleteCategorie from '../modals/delete/DeleteCategorie';
import EditCategorie from '../modals/edit/EditCategorie';
import {
  Input,
  initTE,
} from "tw-elements";
import Search from '../sub-components/search/Search'

function Designations() {
  const { t } = useTranslation()



 
  

  return (
    
    <h1>{t("Designation")}</h1>

  )
}
export default memo(Designations)