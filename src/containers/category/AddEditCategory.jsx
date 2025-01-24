import React from 'react'
import {Typography,Modal,Box,Divider,TextField,Button} from "@mui/material"
import { addCategory,updateCategory } from '../../redux/actions/category';
import {useTranslation} from "react-i18next"
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import usePermissions from '../../hooks/usePermissions';
import { toast } from 'react-toastify';
import Unauthorized from '../Unauthorized';
function AddEditCategory({open,handleClose,selectedCategoryId}) {
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
      const addCategoryAuth=usePermissions("add_category")
      const editCategoryAuth=usePermissions("edit_category")
      const {t}=useTranslation()
      const dispatch=useDispatch()
      const [name, setname] = useState("")
      const handleChange=(e)=>{
        setname(e.target.value)
        } 
     const category=useSelector(state=>selectedCategoryId?state.category.categories.find(element=>element.id===selectedCategoryId):null);
     useEffect(() => {
       if(selectedCategoryId){
        setname(category.name)
       }
     }, [selectedCategoryId])
     
     const handleSubmit=()=>{
      
            if(selectedCategoryId){
               
                dispatch(updateCategory({id:selectedCategoryId,name,toast}))
               
            }
            else {
                dispatch(addCategory({name,toast}))
            }
            setname("")
     }
     if(!addCategoryAuth) return   <Unauthorized/>
     if(!editCategoryAuth) return   <Unauthorized/>
     
  return (
    <div><Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style} >
        <Typography id="modal-modal-title"  component="h2" >
     { selectedCategoryId ? t("update_category"):t("add_new_category")}
        </Typography>
        <Divider/>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",padding:3}}>
         <TextField
         label={t("add_new_category")}
         name="name"
         type="text"
         value={name}
         required
         onChange={handleChange}
         ></TextField>
          </Box>
         <Divider/>
          <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit" onClick={()=>handleSubmit(name)}>{selectedCategoryId ?t("update"):t("add")}</Button>
                <Button   variant="outlined" type="submit"  sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}} onClick={handleClose}>{t("cancel")}</Button>
              </Box>
      </Box></Modal> </div>
  )
}

export default AddEditCategory