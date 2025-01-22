import React from 'react'
import {Box,Button,Typography,IconButton} from "@mui/material"
import { useTranslation } from 'react-i18next'
import  {useSelector,useDispatch} from 'react-redux'
import { useEffect,useState } from 'react'
import BallotIcon from '@mui/icons-material/Ballot';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { useOutletContext } from 'react-router-dom'
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
 import AddEditRole from './AddEditRole'
import { getAllRoles} from '../../redux/actions/role'
import { useNavigate } from 'react-router-dom'
import usePermissions from '../../hooks/usePermissions'
import DeleteRole from './DeleteRole'
import Unauthorized from '../Unauthorized'
function Roles() {
  const [open,setOpen]=React.useState(false)
  const [openDelete, setopenDelete] = useState(false)
  const { searchItem } = useOutletContext();
  const [selectedRole, setSelectedRole] = useState(null)
  const isAuth=usePermissions("get_roles")
const navigate=useNavigate()
  const handleClose=()=>{
    setOpen(false)
  }
  const handleCloseDeleteModel=()=>{
    setopenDelete(false)
    
  }
  const handleOpenEditModel=(id)=>{
    setOpen(true)
    setSelectedRole(id)
  }
  const handleOpenAddModel=()=>{
    setOpen(true);
    setSelectedRole(null)
  }
  const {t}=useTranslation()
  const dispatch=useDispatch()
  const {roles}=useSelector(state=>state.role)
  useEffect(() => {
   dispatch(getAllRoles())
  }, [dispatch])
  const newRoles=roles && roles.filter(role=>role.name.toUpperCase().includes(searchItem.toUpperCase()));

    const columns=[
      { field: 'id', headerName: "id", width: 300 },
      {field:"name",headerName:t("name"),editable:true,width:300},
      {
        field: 'action',
        headerName: "Action",
        width: 300,
        renderCell:(params)=>{
          return (
            <Box display="flex" sx={{ position:"relative", justifyContent:"start",alignItems:"center",marginTop:2}}>
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
          
          <IconButton 
          onClick={()=>navigate(`/role/permissions/${params.id}`)} 
          sx={{
            width:30,
            height:30,
            color:"black",
            "&:hover":{
              color:"white",
              backgroundColor:"black"
            }}}>
            < BallotIcon/>
          </IconButton>
  
            </Box>
            
          )
        }
    
      }
    ]
    if(!isAuth) return <Unauthorized/> 
  return (
    <div><Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Typography align="start" variant="h5" sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>Roles </Typography>
    <Button onClick={handleOpenAddModel}  sx={{backgroundColor:"#139950",height:50,px:5,fontSize:11,color:"white"}} ><AddIcon/>{t("add_new_role")}</Button>
    </Box>
    <Box  >
    <DataGrid 
     rowHeight={70}
    sx={{width:"100%",backgroundColor:"white"}}
    columns={columns}
    rows={newRoles}
    >


    </DataGrid>
    {open && <AddEditRole handleClose={handleClose} selectedRole={selectedRole} open={open}/> }
    {openDelete && <DeleteRole handleClose={handleCloseDeleteModel} openDelete={openDelete} selectedRole={selectedRole}/> }
    </Box>
      
    </div>
  )
}

export default Roles