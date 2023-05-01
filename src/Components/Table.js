import React from "react";
import {useTranslation} from "react-i18next";

export default function Table({cols,data}){
    const {t}= useTranslation()
    return(
        <table className="dataTable">
            <thead>
                <tr>
                    {
                        cols.map((col,i)=>{
                            return(
                                <th key={i}>{col}</th>
                            )
                        })
                    }
                </tr>
            </thead>
            <tbody>
                    {
                        data.map((d,i)=>{
                            return(
                                    <tr key={i}>
                                        {Object.values(d).map((v,i)=>{
                                            return(
                                                <td key={i}>{v}</td>
                                            )

                                        })}
                                        <td>{t("Supprimer")}</td>
                                        <td>{t("Modifier")}</td>
                                    </tr>
                                )
                            }
                        )
                    }
            </tbody>
        </table>
    )
}

