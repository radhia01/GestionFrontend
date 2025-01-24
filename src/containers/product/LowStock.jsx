import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { getAllProducts } from '../../redux/actions/products';
import {useDispatch,useSelector} from "react-redux"
import { useOutletContext } from 'react-router-dom';
import {useEffect } from 'react';
import { getAllCategories } from '../../redux/actions/category';
import usePermissions from '../../hooks/usePermissions';
import {useTranslation} from "react-i18next"
import Divider from '@mui/material/Divider';
import {toast} from 'react-toastify'
import { getAllImages } from '../../redux/actions/image';
import { useMemo } from 'react';
import { resetError, resetResponse } from '../../redux/reducers/product';
import Unauthorized from '../Unauthorized';

export default function LowStock() {
  const { searchItem } = useOutletContext();
  const dispatch=useDispatch()
 const isAuth=usePermissions(["view_low_stock"])
  const {images}=useSelector(state=>state.image)
  const {t}=useTranslation()
  const {products}=useSelector(state=>state.product)
  const {categories}=useSelector(state=>state.category)
  const { error,response } = useSelector(state => state.product)
  const getProductImage=(id)=>{
   const image=images && images.find(image=>image.id_product===id)
   return image? image.url:null
  }

  const newProducts = useMemo(() => {
    return products
      ? products.filter(product=>product.quantity<=product.expiry_quantity)
          .map(product => ({
              id:product.id,
              name:product.name,
              category:product?.category?.name,
              quantity:product.quantity,
              expiry_quantity:product.expiry_quantity
          }))
      : [];
  }, [products, searchItem, categories]);
  // useEffcet
  useEffect(() => {
    dispatch(getAllProducts())
    dispatch(getAllCategories())
    dispatch(getAllImages())
   }, [])
   
  useEffect(() => {
   dispatch(resetError())
   dispatch(resetResponse())
  }, [dispatch])
  
    
  const columns = [
    { field: 'id', headerName: "id", width: 260 },
    {
      field: 'name',
      headerName: t("name"),
      width: 300,
      sortable:true,
    },
    {
      field: 'category',
      headerName: t("category"),
      width: 200,
      editable: true,
    
    },
    {
      field: 'quantity',
      headerName: t("quantity"),
      width: 200,
      editable: true,
     
    },
    {
      field: 'expiry_quantity',
      headerName: t("quantity_alert"),
      width: 200,
      editable: true,
     
    },
  
  ];
  // if(!isAuth)
  //   return <Unauthorized/>
  
  return (
    <div>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Typography align="start"  sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>{t("low_stock")} </Typography>
    </Box>
    <Divider/>
     <Box sx={{  marginTop:4 ,display:"flex",justifyContent:"center"}}>
      { newProducts?.length===0 ?  <Typography variant='h5'>No Products in low stock  </Typography>  :
       <DataGrid
       rowHeight={70}
       rows={newProducts}
       sx={{backgroundColor:"white"}}
       columns={columns}
       initialState={{
         pagination: {
           paginationModel: {
             pageSize: 5,
           },
         },
       }}
       pageSizeOptions={[5]}
       checkboxSelection
       disableRowSelectionOnClick
       onProcessRowUpdateError={error=>{console.log(error)}}
     />
     }
     
    </Box>
  </div>
   
  );
}