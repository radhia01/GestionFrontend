import { Box, Button, Divider, Modal, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import usePermissions from '../../hooks/usePermissions'
import { deletePermission} from '../../redux/actions/permission'
import Unauthorized from '../Unauthorized'
export const DeletePermission=({handleClose,selectedPermission,openDelete})=>{
    const isAuth=usePermissions("delete_permission")
    const dispatch=useDispatch()
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
      const handleDeleteRole=()=>{
          dispatch(deletePermission({id:selectedPermission,toast}))
          handleClose();
  
        }
      if(!isAuth) return <Unauthorized/>
 
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
              handleDeleteRole();
              handleClose()
            }}>{t("yes")}</Button>
            <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
          </Box>
        </Box>
      </Modal> 
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
              handleDeleteRole();
              handleClose()
            }}>{t("yes")}</Button>
            <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
          </Box>
        </Box>
      </Modal>
    </div>
    )
  }
  export default DeletePermission