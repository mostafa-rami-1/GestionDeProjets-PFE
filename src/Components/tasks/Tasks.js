import React from 'react'
import { useTranslation } from 'react-i18next';


export default function Tasks() {
  const {t}= useTranslation()

  return (
    <h1>{t("Taches")}</h1>
  )
}
