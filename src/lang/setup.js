import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'




export default  function languageConfig() {
    i18next
        .use(HttpApi)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            supportedLngs: ['ar', 'fr', "en"],
            fallbackLng: 'fr',
            debug: false,
            // Options for language detector
            detection: {
                order: ['cookie', 'htmlTag',  'path'],
                caches: ['cookie'],
            },
            // react: { useSuspense: false },
            backend: {
                loadPath: '/assets/locales/{{lng}}/translation.json',
            },
        })
    
}