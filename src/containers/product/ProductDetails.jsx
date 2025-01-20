import * as React from 'react';
import {Typography} from "@mui/material"
import { useParams } from 'react-router-dom';
import { getAllProducts } from '../../redux/actions/products';
import { useEffect } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { useTranslation } from 'react-i18next';
import usePermissions from '../../hooks/usePermissions';
import Table from '../../components/Table';
function ProductDetails() {
  const {t}=useTranslation()
  // const isAuth=usePermissions((["view_product"]))
   const {products}=useSelector(state=>state.product)
   const {id}=useParams()
    const dispatch=useDispatch()
     useEffect(() => {
     dispatch(getAllProducts())
         }, [dispatch])

    const product=products && products.find(product=>product.id===id)
    console.log(product)
    // if(!isAuth){
    //      return <Box justifyContent="center"><Typography variant="h4">{t("not_authorized")}</Typography></Box>
    // }
    return (
      <div className='w-full  '>
            <Typography align='start' sx={{my:4,fontSize:20,fontWeight:"bold"}}>{t("product_details")}</Typography>
            <div className=' w-full     gap-4'  >
            <Table product={product}/>
   <div className='p-4  grid grid-cols '>
        <Typography align='start' sx={{my:4,fontSize:20,fontWeight:"bold"}}>Images</Typography>
           {product.images && product.images.map((image,index)=>(
             <img  key={index}  className='m-2   ' src={image} />
                        ))
                 }</div> 
            </div>
       </div>
    );
   
  
}

export default ProductDetails
