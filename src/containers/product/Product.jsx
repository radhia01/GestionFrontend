import { Button, Typography ,Divider} from '@mui/material'
import React from 'react'
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import {toast} from "react-toastify"
import { useTranslation } from 'react-i18next';
import {useOutletContext} from "react-router-dom"
import dayjs from 'dayjs';
import InfoIcon from '@mui/icons-material/Info';
import ProductForm from './ProductForm';
import { addProduct } from '../../redux/actions/products';
import ImageUpload from './ImageUpload';

function Product() {
  const dispatch = useDispatch()
  // const isAuthorised=usePermissions(["add_product","edit_product"])
  const {productId } = useOutletContext();
  const [value, setValue] = React.useState(dayjs('2024-01-01'));
  const [manufacturedDate, setmanufacturedDate] = React.useState(dayjs('2024-01-01'));
  const [files, setfiles] = useState([])
  const [product, setProduct] = useState({
    name: "", description: "", price: "", quantity: 0, id_category: "",id_brand:"",expired_date:"",expiry_quantity:""
  })
  const productItem=useSelector(state=>productId?state.product.products.find(product=>product.id===productId):null)
  const handleFiles=(e)=>{
  setfiles([...e.target.files])
  console.log(files)
  }
  useEffect(() => {
   if(productId){
    setProduct(productItem)
    setValue(dayjs(productItem.expired_date)); 
    setmanufacturedDate(dayjs(productItem.created_on)); 
   }
  }, [productId])
  const {t}=useTranslation()
  // const ProductImages=useMemo(()=>{
  //   return productId?images.filter(image=>image.id_product===productId):null
  //      },[productId,images])
    
  const handleChange = (e) => {
        setProduct({
          ...product,
          [e.target.name]: e.target.value
        })
        console.log(product)
      }
      const handleDateChange = (newValue) => {
        setValue(newValue);
        setProduct(prev => ({
          ...prev,
          expired_date: newValue.toISOString(), // Mise à jour de la date d'expiration
        }));
      };
      
      const handleManufacturedDate = (newDate) => {
        setmanufacturedDate(newDate);
        setProduct(prev => ({
          ...prev,
          created_on: newDate.toISOString(), // Mise à jour de la date de création
        }));
      };
    // @ts-ignore
    const handleSubmitProduct = async (e) => {
        e.preventDefault();
        const form=new FormData()
       
        const dataToSend={
          ...product,
          quantity:Number(product.quantity),
          expiry_quantity: Number(product.expiry_quantity),
        }
      
        form.append("data",JSON.stringify(dataToSend))
        files.forEach(file=>{
          form.append("image",file)
        })
       // @ts-ignore
       dispatch(addProduct({form,toast}))
        
        }
  return (
    <div>
      <Typography align='left' sx={{my:2,fontSize:16,fontWeight:"bold",color:"#F2C12E"}}>{productId?t("update_product"):t("add_new_product")}</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" ,backgroundColor:"white",maxHeight:"550px",overflowY:"auto"}}>
           <Box sx={{padding:3,display:"flex"}}><InfoIcon/><Typography >{t("product_info")}</Typography></Box> 
          <Divider/>
        
            <ProductForm 
       // @ts-ignore
            handleChange={handleChange} product={product}  handleDateChange={handleDateChange} handleManufacturedDate={handleManufacturedDate} manufacturedDate={manufacturedDate} value={value}/>
           
         
            <ImageUpload handleFiles={handleFiles} files={files}/>
      
            <Divider/>
           
            <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit" onClick={handleSubmitProduct}>{productId ? t("update"):t("add")}</Button>
              <Button   variant="outlined" type="submit"  sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}}>{t("cancel")}</Button>
            </Box>
          </Box>
        
    
    </div>
  )
}

export default Product
