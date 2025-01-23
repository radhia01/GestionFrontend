import React from 'react'
import {Box,Button,Typography,IconButton} from "@mui/material"
import { useTranslation } from 'react-i18next'
import  {useSelector,useDispatch} from 'react-redux'
import { useEffect,useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import usePermissions from '../../hooks/usePermissions'
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { DeleteUser } from './DeleteUser'
import {getAllUsers} from "../../redux/actions/user"
import { getAllRoles } from '../../redux/actions/role'
import AddEditUser from './AddEditUser'
import Unauthorized from '../Unauthorized'
function Users() {
  const [open,setOpen]=React.useState(false)
  const { searchItem } = useOutletContext();
  const [openDelete, setopenDelete] = useState(false)
  const [selectedUser, setselectedUser] = useState(null)
  const {users}=useSelector(state=>state.user)
  const [userId, setUserId] = useState(null)
  const isAuth=usePermissions("get_users")
  const {t}=useTranslation()
  const dispatch=useDispatch()
  const handleClose=()=>{
    setOpen(false)
  }
  const handleCloseDeleteModel=()=>{
    setopenDelete(false)
    
  }
  const handleOpenEditModel=(id)=>{
    setOpen(true)
    setUserId(id)
  }
  const handleOpenAddModel=()=>{
    setOpen(true);
    setUserId(null)
  }
   const handleOpenDeleteModal=(id)=>{
    setselectedUser(id)
    setopenDelete(true)
    
   }
  const newUsers=users?.map(user=>({
      id:user.id,
      firstName:user.firstName,
      lastName:user.lastName,
      email:user.email,
      phone:user.email,
      role: user?.role?.name
  }))
 console.log(newUsers)  // const filteredUsers=users && users.filter(user=>getUserRole(user.id_role)==="customer" || getUserRole(user.id_role)==="supplier" && user.firstName.toUpperCase().includes(searchItem.toUpperCase()))
  useEffect(() => {
   dispatch(getAllUsers())
   dispatch(getAllRoles())
  }, [dispatch])

  
    const columns=[
      {field:"id",headerName:t("ID"),editable:false,width:200},
      {field:"firstName",headerName:t("firstName"),editable:true,width:200},
      {field:"lastName",headerName:t("lastName"),editable:true,width:200},
      {field:"email",headerName:t("email"),editable:true,width:300},
      {field:"phone",headerName:t("phone"),editable:true,width:150},
      {field:"role",headerName:t("role"),editable:true,width:200},
      {
        field: 'action',
        headerName: "Action",
        width: 200,
        renderCell:(params)=>{
          return (
            <Box display="flex" sx={{justifyContent:"start",alignItems:"center",marginTop:3}}>
               <IconButton color="error"  onClick={()=>handleOpenDeleteModal(params.id)} sx={{width:30, padding:2,
            height:30,
              "&:hover":{
            color:"white",
            backgroundColor:"red"
          }}}>
          <DeleteOutlineRoundedIcon  />
        </IconButton>
            
          <IconButton 
          onClick={()=>handleOpenEditModel(params.id)} sx={{
            width:30,
            height:30,
            color:"black",
            "&:hover":{
              color:"white",
              backgroundColor:"#159A9C"
            }}}>
            < BorderColorRoundedIcon/>
          </IconButton>
            </Box>
            
          )
        }

      }
    ]
   
     if(!isAuth) return <Unauthorized/>
  return (
    <div>
   
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
       <Typography align="start" variant="h5" sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>{t("users_list")} </Typography>
       <Button onClick={handleOpenAddModel}  sx={{backgroundColor:"#139950",height:50,px:5,fontSize:11,color:"white"}} ><AddIcon/>{t("add_new_user")}</Button>
       </Box>
       <Box  >
       <DataGrid 
       rowHeight={85}
       sx={{width:"95%",backgroundColor:"white"}}
       columns={columns}
       rows={ newUsers}
       >
       </DataGrid>
       {openDelete && <DeleteUser handleClose={handleCloseDeleteModel} openDelete={openDelete} selectedUser={selectedUser}/> }
       </Box>
       {open && <AddEditUser onClose={handleClose} userId={userId} open={open}/>}
     
    </div>
  )
}

export default Users