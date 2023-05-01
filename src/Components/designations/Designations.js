import React from 'react'
import { Main } from '../../layout/main/Main'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import axiosClient from '../../axios';
import { memo } from 'react';

function Designations() {
  const { t } = useTranslation()
  

  return (
    
    <h1>{t("Designation")}</h1>
  )
}
export default memo(Designations)