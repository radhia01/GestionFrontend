import React from 'react'
import {Box,Button,Typography,IconButton} from "@mui/material"
import { useTranslation } from 'react-i18next'
import  {useSelector,useDispatch} from 'react-redux'
import { useEffect,useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { useOutletContext } from 'react-router-dom'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import { getAllPermissions} from '../../redux/actions/permission'
import AddEditPermission from './AddEditPermission'
import DeletePermission from './DeletePermission'
import Unauthorized from '../Unauthorized'
import usePermissions from '../../hooks/usePermissions'
function Permissions() {
  const [open,setOpen]=React.useState(false)
  const {permissions}=useSelector(state=>state.permission)
  const [openDelete, setOpenDelete] = useState(false)
  const { searchItem } = useOutletContext();
  const [selectedPermission, setSelectedPermission] = useState(null)
   const isAuth=usePermissions("get_permissions")
  const handleClose=()=>{
    setOpen(false)
  }
  const handleCloseDeleteModel=()=>{
    setOpenDelete(false)
  }
  const handleOpenEditModel=(id)=>{
    setOpen(true)
    setSelectedPermission(id)
  }
  const handleOpenAddModel=()=>{
    setOpen(true);
    setSelectedPermission(null)
  }
   const handleOpenDeleteModal=(id)=>{
    console.log(id)
    setSelectedPermission(id)
    setOpenDelete(true)
   }
  const {t}=useTranslation()
  const dispatch=useDispatch()
 

  useEffect(() => {
   dispatch(getAllPermissions())
  }, [dispatch])
  const newPermissions=permissions && permissions.filter(permission=>permission.name.toUpperCase().includes(searchItem.toUpperCase()));

    const columns=[
      { field: 'id', headerName: "id", width: 300 },
      {field:"name",headerName:t("name"),editable:true,width:300},
      {
        field: 'action',
        headerName: "Action",
        width: 300,
        renderCell:(params)=>{
          return (
            <Box display="flex" sx={{justifyContent:"start",alignItems:"center",marginTop:2}}>
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
       <Typography align="start" variant="h5" sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>Permissions </Typography>
       <Button onClick={handleOpenAddModel}  sx={{backgroundColor:"#139950",height:50,px:5,fontSize:11,color:"white"}} ><AddIcon/>{t("add_new_permission")}</Button>
       </Box>
       <Box  >
       <DataGrid 
        rowHeight={70}
       sx={{width:"100%",backgroundColor:"white"}}
       columns={columns}
       rows={newPermissions}
       >
       </DataGrid>
       {open && <AddEditPermission handleClose={handleClose} selectedPermission={selectedPermission} open={open}/> }
       {openDelete && <DeletePermission handleClose={handleCloseDeleteModel} openDelete={openDelete} selectedPermission={selectedPermission}/> }
       </Box>

    </div>
  )
}

export default Permissions