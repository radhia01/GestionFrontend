import { useTranslation } from "react-i18next";
import { deleteUser } from "../../redux/actions/user";
import { useDispatch } from "react-redux";
import usePermissions from "../../hooks/usePermissions";
import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import React from "react";
import Unauthorized from "../Unauthorized";
import { toast } from "react-toastify";
export const DeleteUser=({handleClose,openDelete,selectedUser})=>{
    const dispatch=useDispatch()
    const isAuth=usePermissions("delete_user")
    const {t}=useTranslation()
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
      const handleDeleteUser=()=>{
          dispatch(deleteUser({id:selectedUser,toast}))
          handleClose();
  
        }
         
    if(!isAuth) return    <Unauthorized/> 
    
        
    return (
      <div>
      <Modal
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
              handleDeleteUser();
              handleClose()
            }}>{t("yes")}</Button>
            <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
          </Box>
        </Box>
      </Modal>
     
    </div>
    )
  }
  