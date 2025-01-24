import  {useSelector,useDispatch} from 'react-redux'
import usePermissions from "../../hooks/usePermissions"
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import {Box,Button,Typography,Modal,Divider} from "@mui/material"
import { deleteCategory } from '../../redux/actions/category'
import { Unarchive } from '@mui/icons-material'
import Unauthorized from '../Unauthorized'
import React from 'react'
export const DeleteModal=({handleClose,selectedCategoryId,openDelete})=>{
    const dispatch=useDispatch()
    const {t}=useTranslation()
    const isAuth=usePermissions("delete_category")
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      textAlign:"center",
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      fontSize:20
    
    };
      const handleDeleteCategory=()=>{
       
          dispatch(deleteCategory({id:selectedCategoryId,toast}))
          handleClose();
  
        }
         
        
       
if(!isAuth) return <Unauthorized/>
        
    return (
      <div>  <Modal
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title"  component="h2">
        {t("confirm_delete_category")}
          </Typography>
          <Divider/>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Button variant="contained" sx={{margin:2,backgroundColor:"green"}} onClick={()=>{
              handleDeleteCategory();
              handleClose()
            }}>{t("yes")}</Button>
            <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
          </Box>
        </Box>
      </Modal>
      
    </div>
    )
  }
  

export default DeleteModal