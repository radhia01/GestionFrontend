import React from 'react';
import { Box, Typography, Checkbox,Card,Button ,Modal,Divider,Select,Dialog,FormControl,Stack,InputLabel,MenuItem, DialogContent, DialogTitle} from '@mui/material';
import { useOutletContext } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import Paper from '@mui/material/Paper';
import {getAllPermissions} from "../../redux/actions/permission"
import { useEffect,useState } from 'react';
import {useSelector,useDispatch} from "react-redux"
import { addPermissionToRole, getAllRoles, removeRolePermissions } from '../../redux/actions/role';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getRolePermissions } from '../../redux/actions/role';
import { styled } from '@mui/material/styles';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import usePermissions from '../../hooks/usePermissions';
import DeletePermissionFromRole from './DeletePermissionFromRole';
import AddPermissionToRole from './AddPermissionToRole';
import Unauthorized from '../Unauthorized';



function RolePermissions() {
    const {id}=useParams()
    const dispatch=useDispatch()
    const {t}=useTranslation()
    const { searchItem } = useOutletContext();
    const [idPermission, setidPermission] = useState(null)
    const [OpenDelete, setOpenDelete] = useState(false)
    const [open, setopen] = useState(false)
    const {roles,permissions}=useSelector(state=>state.role)
    const isAuth=usePermissions("get_role_permissions")
    useEffect(() => {
      dispatch(getRolePermissions(id))
      dispatch(getAllRoles())
  }, [dispatch])
   console.log(permissions)
      const getRoleName=(id)=>{
        const role=roles && roles.find(role=>role.id===id)
        
        return role? role.name:null
      }
      const handleClose=()=>{
        setopen(false)
      }
      const handleOpenDeleteModel=(idper)=>{
        setOpenDelete(true)
        setidPermission(idper)
      }
      const handleCloseDeleteModel=()=>{
        setOpenDelete(false);
        setidPermission(null)
      }
      const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(3),
        margin:theme.spacing(2),
        dispatch:"flex",
        alignContent:"space-between",
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));
     
  
      if(!isAuth) return <Unauthorized/>
      return (
    <div>
       <Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
          <Typography align="start" variant="h5" sx={{ my: 4, fontSize: 16, fontWeight: 'bold', color: '#F2C12E' }}>
          Permissions 
        </Typography>
        <Typography variant='h6'>{getRoleName(id)} role</Typography>
          </Box>
          <Button  onClick={()=>setopen(true)} sx={{backgroundColor:"#139950",height:50,px:2,fontSize:11,color:"white"}}><AddIcon/>{t("add_new_permission")}</Button>
          </Box>
        <Stack   direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' ,padding:2 }}> {permissions && permissions.map((permission)=>(
       <Item  key={permission.id} sx={{ width: 'calc(20% - 8px)'  ,marginBottom:"12px"}}>{permission.name} <Button><ClearRoundedIcon sx={{color:"red"}}   onClick={()=>handleOpenDeleteModel(permission.id)}/></Button></Item>
              ))}     </Stack>
         
          </Box>
         {setOpenDelete && <DeletePermissionFromRole  open={OpenDelete} id={id} idPermission={idPermission} handleClose={handleCloseDeleteModel}/>} 
          {open && <AddPermissionToRole id={id}  handleClose={handleClose} getRoleName={getRoleName} rolePermissions={permissions}/>}
     
    </div>
  );
}

export default RolePermissions;
