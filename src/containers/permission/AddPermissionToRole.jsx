import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { addPermissionToRole } from '../../redux/actions/role'
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { getAllPermissions } from '../../redux/actions/permission'
import { toast } from 'react-toastify'
const AddPermissionToRole=({id,handleClose,getRoleName,rolePermissions})=>{
  console.log(rolePermissions)
    const dispatch=useDispatch()
    const {t}=useTranslation()
     const [idper, setidper] = useState("")
     const {permissions}=useSelector(state=>state.permission)
     console.log(permissions)
    //  const isAuth=usePermissions(["add_permission_to_role"])
     const handleChange=(e)=>{
     setidper(e.target.value)
     }
     useEffect(() => {
      dispatch(getAllPermissions())
     }, [dispatch])
     
     const handleSubmit=()=>{
      dispatch(addPermissionToRole({id_role:id,id_permission:idper,toast}))
      handleClose()
     }
  //    if(!isAuth) return    
  //     <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
     
     
  // <DialogContent>
  //   <Typography variant="h4">{t("not_authorized")}</Typography>
  //    </DialogContent>
  
  // </Dialog>
   
    return (
      
      
     <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
        <DialogTitle>Add new Permission to {getRoleName(id) } role </DialogTitle>
        <DialogContent>
        <FormControl sx={{width:"100%", margin: 2 }}>
      <InputLabel id="category-select-label">permission</InputLabel>
      <Select
        id="category-select"
        label="permmission"
        name="id_category"
        onChange={handleChange}
      >
        {permissions && permissions.map(element=>{
          const isFound=rolePermissions && rolePermissions.find(permission=>permission.id===element.id)
          if(!isFound){
            return (
              <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
            )
          }
          return null 
        })}
      </Select>
    </FormControl>
    <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit"  onClick={handleSubmit}>{t("add")}</Button>
                <Button   variant="outlined" type="submit"  onClick={handleClose} sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}}>{t("cancel")}</Button>
              </Box>
        </DialogContent>
     
    </Dialog>
      
      
    )
  }

export default AddPermissionToRole