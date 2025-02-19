import React from 'react'
import {Typography,Modal,Box,Divider,TextField,Button} from "@mui/material"
import {useTranslation} from "react-i18next"
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addPermission, updatePermission } from '../../redux/actions/permission';
import {toast} from "react-toastify"
import usePermissions from '../../hooks/usePermissions';
import Unauthorized from '../Unauthorized';
function AddEditPermission({open,handleClose,selectedPermission}) {
    const addPermissionAuth=usePermissions("add_permission")
    const editPermissionAuth=usePermissions("edit_permission")
     
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
     const Permission=useSelector(state=>selectedPermission?state.permission.permissions.find(permission=>permission.id===selectedPermission):null);
     const handleChange=(e)=>{
      setname(e.target.value)
      } 
     useEffect(() => {
       if(selectedPermission){
        setname(Permission.name)
       }
     }, [selectedPermission])
     
     const handleSubmit=()=>{
      
            if(selectedPermission){
               
                dispatch(updatePermission({id:selectedPermission,name,toast}))
            }
            else {
                dispatch(addPermission({name,toast}))
            }
       handleClose()
     }

  if(!addPermissionAuth) return <Unauthorized/>
  if(!editPermissionAuth) return <Unauthorized/>
  return (
    <div><Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
       <Box sx={style} >
        <Typography id="modal-modal-title"  component="h2" >
     { selectedPermission ? t("update_Permission"):t("add_new_permission")}
        </Typography>
        <Divider/>
        <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",padding:3}}>
         <TextField
         label={t("add_new_permission")}
         name="name"
         type="text"
         value={name}
         required
         onChange={handleChange}
         ></TextField>
          </Box>
         <Divider/>
          <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit" onClick={()=>handleSubmit(name)}>{selectedPermission ?t("update"):t("add")}</Button>
                <Button   variant="outlined" type="submit"  sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}} onClick={handleClose}>{t("cancel")}</Button>
              </Box>
      </Box></Modal></div>
  )
}

export default AddEditPermission