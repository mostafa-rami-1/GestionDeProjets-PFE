import React from "react";
import {BallTriangle} from 'react-loading-icons'
import "./loading.css"
import {useTranslation} from "react-i18next";
import { memo } from "react";


const LoadingMarkup =()=>{
    const {t}=useTranslation()
    return (
         <div className="loading" >
            <div id="wifi-loader">
                <svg className="circle-outer" viewBox="0 0 86 86">
                    <circle className="back" cx="43" cy="43" r="40"></circle>
                    <circle className="front" cx="43" cy="43" r="40"></circle>
                    <circle className="new" cx="43" cy="43" r="40"></circle>
                </svg>
                <svg className="circle-middle" viewBox="0 0 60 60">
                    <circle className="back" cx="30" cy="30" r="27"></circle>
                    <circle className="front" cx="30" cy="30" r="27"></circle>
                </svg>
                <svg className="circle-inner" viewBox="0 0 34 34">
                    <circle className="back" cx="17" cy="17" r="14"></circle>
                    <circle className="front" cx="17" cy="17" r="14"></circle>
                </svg>
                <div className="text" data-text="Chargement"></div>
                </div>
         </div>



        
    )
}
export default memo( LoadingMarkup)