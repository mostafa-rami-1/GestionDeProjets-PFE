import React, {memo } from 'react'
import { Main } from '../../layout/main/Main'
import { useTranslation } from 'react-i18next';
import { Trash ,Edit } from 'iconsax-react'

const Members = () => {
  const {t}= useTranslation()
  
  
  return (
    <>
      <h1>{t("Membres")}</h1>
      <div className="data-container">
        <table className='fixed_header'>
          <thead>
              <tr>
                  <th>{t("nom")}</th>
                  <th>{t("date de debut")}</th>
                  <th>{t("date de création")}</th>
                  <th>{t("date de livraison")}</th>
                  <th>{t("client")}</th>
                  <th>{t("catégorie")}</th>
                <th>{t("membres")}</th>

                  <th>{t('Action') }</th>
              </tr>
          </thead>  
          <tbody>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td"><Edit size="25" color="#FF8A65"/><Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
            <tr>
              <td data-label={t("nom")}>Visa - 3412</td>
              <td data-label={t("date de debut")}>04/01/2016</td>
              <td data-label={t("date de création")}>$1,190</td>
              <td data-label={t("date de livraison")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("client")}>03/01/2016 - 03/31/2016</td>
              <td data-label={t("catégorie")}>03/0
              <td data-label={t("catégorie")}>03/01/2016 - 03/31/2016</td>
              1/2016 - 03/31/2016</td>
              <td data-label={t('Action') } className="l-td">  <Edit size="25" color="#FF8A65"/> <Trash size="25" color="#FF8A65"/></td>
            </tr>
        </tbody>
        </table>
      </div>
    </>
   
    
  )
}

export default memo(Members)