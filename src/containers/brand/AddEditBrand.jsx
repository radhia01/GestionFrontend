
import {Typography,Modal,Box,Divider,TextField,Button} from "@mui/material"
import { addBrand, updateBrand } from '../../redux/actions/brand';
import {useTranslation} from "react-i18next"
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import usePermissions from "../../hooks/usePermissions";
import Unauthorized from "../Unauthorized";
import React from "react";
function AddEditBrand({open,handleClose,selectedBrandId,setSelectedBrandId}) {
     const addBrandAuth=usePermissions("add_brand")
     const editBrandAuth=usePermissions("edit_brand")
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      const {t}=useTranslation()
      const dispatch=useDispatch()
      const [name, setname] = useState("")
      const handleChange=(e)=>{
        setname(e.target.value)
        } 
     const brand=useSelector(state=>selectedBrandId?state.brand.brands.find(element=>element.id===selectedBrandId):null);
     useEffect(() => {
       if(selectedBrandId){
        setname(brand.name)
       }
     }, [selectedBrandId])
     
     const handleSubmit=()=>{
      
            if(selectedBrandId){
               
                dispatch(updateBrand({id:selectedBrandId,name,toast}))
            }
            else {
                dispatch(addBrand({name,toast}))
                setSelectedBrandId(null)
            }
         setname("")
     }
   if(!addBrandAuth) return   <Unauthorized/>
   if(!editBrandAuth) return   <Unauthorized/>
 
  return (
    <div> 
      
     <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
     <Box sx={style} >
      <Typography id="modal-modal-title"  component="h2" >
   { selectedBrandId ? t("update_brand"):t("add_new_brand")}
      </Typography>
      <Divider/>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",padding:3}}>
       <TextField
       label={t("add_new_brand")}
       name="name"
       type="text"
       value={name}
       required
       onChange={handleChange}
       ></TextField>
        </Box>
       <Divider/>

        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit" onClick={()=>handleSubmit(name)}>{selectedBrandId ?t("update"):t("add")}</Button>
              <Button   variant="outlined" type="submit"  sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}} onClick={handleClose}>{t("cancel")}</Button>
            </Box>
    </Box></Modal></div>  )
}

export default AddEditBrand