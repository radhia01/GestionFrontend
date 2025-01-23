import React from 'react'
import { Dialog,DialogTitle,DialogContent,Box,Button} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState,useEffect } from 'react'
import { addUser,updateUser } from '../../redux/actions/user'
import { useDispatch,useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { getAllRoles } from '../../redux/actions/role'
import usePermissions from '../../hooks/usePermissions'
import Unauthorized from '../Unauthorized'
import UserForm from './UserForm'
function AddEditUser({onClose,open,userId}) {
    const {t}=useTranslation()
    const dispatch=useDispatch()
    const addUserAuth=usePermissions("add_user")
    const editUserAuth=usePermissions("edit_user")
    const {error}=useSelector(state=>state.user)
    const {roles}=useSelector(state=>state.role)
    const [user, setuser] = useState({
        firstName:"",lastName:"",email:"",phone:"",id_role:""
    })
    const userData=useSelector(state=>userId?state.user.users.find(user=>user.id===userId):null)
    const handleChange=(e)=>{
        setuser({...user,
            [e.target.name]:e.target.value
        })
    }
   const handleSubmit=(e)=>{
    e.preventDefault()
    if(userId){
      dispatch(updateUser({id:userId,user,toast}))
    }
    else { 
      dispatch(addUser({user,toast}))}
     setuser({...user,
        firstName:"",
        lastName:"",
        email:"",
        phone:""
    })
      if(!error){
       onClose()
       
      }
     
   }
   useEffect(() => {
    if(userId){
        setuser(userData)
    }
   }, [userId])
   
     useEffect(() => {
      dispatch(getAllRoles())
     }, [dispatch])
     if (!userId && !addUserAuth)  return <Unauthorized/>
     if (userId && !editUserAuth)  return <Unauthorized/>
      
    
    
  return (
    <div>
      <Dialog  fullWidth maxWidth="lg" onClose={onClose} open={open}>
      <DialogTitle sx={{backgroundColor:"#D9D9D9"}}>{userId?t("update_user"):t("add_new_user")}</DialogTitle>
      <DialogContent>
        <UserForm user={user} roles={roles} handleChange={handleChange}/>
      </DialogContent>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
              <Button   sx={{margin:1,color:"white",backgroundColor:"green"}}variant="outlined" type="submit"  onClick={handleSubmit}>{userId?t("update"):t("add")}</Button>
              <Button   variant="outlined" type="submit"  onClick={onClose} sx={{backgroundColor:"#B4BEC9",color:"white",margin:1,borderColor:"#B4BEC9"}}>{t("cancel")}</Button>
            </Box>
    </Dialog>
      
    </div>
  )
}

export default AddEditUser