import React from 'react'
import {useTranslation} from "react-i18next"
function Table({product}) {
  console.log(product)
    const {t}=useTranslation()
    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    };
  return (
   
        <table  className=' w-full bg-white border  border-gray-200 '>
        
        <tr className='bg-red-200 h-20' >
          <th>{t("product_name")}</th>
          <td>{product.name}</td>
         
        </tr>
        <tr  className='bg-gray-200 h-20'>
          <th>{t("Product_Description")}</th>
          <td>{product.description}</td>
        </tr>
        <tr  className='bg-red-200  h-20' >
          <th>{t("Product_Price")}</th>
          <td>{ formatPrice(product.price)}</td>
        </tr>
        <tr  className='bg-gray-200 h-20' >
          <th>{t("Product_Quantity")}</th>
          <td>{product.quantity}</td>
        </tr>
        <tr  className='bg-red-200  h-20' >
          <th>{t("category")}</th>
          <td>{(product.category?product.category.name:"")}</td>
        </tr>
        <tr  className='bg-gray-200 h-20' >
          <th>{t("brand")}</th>
          <td>{product.brand.name}</td>
        </tr>
    </table>
 
  )
}

export default Table