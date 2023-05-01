import React from 'react'
import { memo } from 'react';
import { useTranslation } from 'react-i18next';



function Reports() {
  const {t}= useTranslation()

  return (
    <h1>{t("Rapports")}</h1>
  )
}
export default memo(Reports)