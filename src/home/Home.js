import i18next from 'i18next'
import React, { useEffect,memo} from 'react'
import { useTranslation } from 'react-i18next'
import Main  from '../layout/main/Main'
import { pageDirConfig } from "../lang/pageDirConfig";
import "./home.css"

const Home = () => {
  const {t}=useTranslation()
  useEffect(() => {
    pageDirConfig(i18next.dir())
  }, [t]);
  return (<Main/>)
}
export default memo(Home)