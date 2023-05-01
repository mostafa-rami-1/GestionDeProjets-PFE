
import React,{useEffect} from 'react'

import i18next from 'i18next'

import cookies from 'js-cookie'

const languages = [
  {
    code: 'fr',
    name: 'Français',
    dir: 'ltr',
    country_code: 'fr',
  },
  {
    code: 'en',
    name: 'English',
    dir: 'ltr',
    country_code: 'gb',
  },
  {
    code: 'ar',
    name: 'العربية',
    dir: 'rtl',
    country_code: 'sa',
  },
]

function LanguageModal() {
  
  const currentLanguageCode = cookies.get('i18next') || 'fr'
  return (
    <div className="languageModal">
      {languages.map(({ code, name, country_code,dir }) => (
        <button onClick={() => {
          i18next.changeLanguage(code)
          
           document.querySelector("html").lang= code
          
           document.dir = dir
        }} key={country_code}
          style={{opacity: currentLanguageCode === code ? 0.5 : 1,}}
        > 
          {name}
        </button>
         ))}
    </div>
  )
}

export default LanguageModal