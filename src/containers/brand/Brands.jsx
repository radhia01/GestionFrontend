import React from 'react'
import {Box,Button,Typography,IconButton} from "@mui/material"
import { useTranslation } from 'react-i18next'
import  {useSelector,useDispatch} from 'react-redux'
import { useEffect,useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import AddEditBrand from './AddEditBrand'
import { getAllBrands } from '../../redux/actions/brand'
import DeleteBrand from './DeleteBrand'
import usePermissions from '../../hooks/usePermissions'
import Unauthorized from '../Unauthorized'

function Brands() {
  const {t}=useTranslation()
  const dispatch=useDispatch()
  const [open,setOpen]=React.useState(false)
  const { searchItem } = useOutletContext();
  const {brands}=useSelector(state=>state.brand)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedBrandId, setSelectedBrandId] = useState(null)
  const isAuthorized=usePermissions("get_brands")
  const handleClose=()=>{
    setOpen(false)
  }
  const handleCloseDeleteModel=()=>{
    setOpenDelete(false)
  }
  const handleOpenEditModel=(id)=>{
    setOpen(true)
    setSelectedBrandId(id)
  }
  const handleOpenAddModel=()=>{
    setOpen(true);
    setSelectedBrandId(null)
  }
   const handleOpenDeleteModal=(id)=>{
    setSelectedBrandId(id)
    setOpenDelete(true)
   }
  useEffect(() => {
   dispatch(getAllBrands())
  }, [dispatch])
  
    const columns=[
      {field:"name",headerName:t("name"),editable:true,width:300},
      {field:"created_on",headerName:t("created_date"),editable:true,width:300,
        renderCell:(params)=>{
          return <span>{getDate(params.row.created_on)}</span>
        }
      },
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
    const getDate=(date)=>{
      const brandDate=date.slice(0,10)
      return brandDate? brandDate :null
    }
      const newBrands=brands && brands.filter(brand=>brand?.name?.toUpperCase().includes(searchItem.toUpperCase()))
       if(!isAuthorized)
        return <Unauthorized/>
  return (
    <div>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
       <Typography align="start" variant="h5" sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>{t("Brands_list")} </Typography>
       <Button onClick={handleOpenAddModel}  sx={{backgroundColor:"#139950",height:50,px:5,fontSize:11,color:"white"}} ><AddIcon/>{t("add_new_brand")}</Button>
       </Box>
       <Box   sx={{width:"90%"}}>
       <DataGrid 
        rowHeight={70}
       sx={{width:"100%",backgroundColor:"white"}}
       columns={columns}
       rows={newBrands}
       >


       </DataGrid>
       {open && <AddEditBrand handleClose={handleClose} setSelectedBrandId={setSelectedBrandId}  selectedBrandId={selectedBrandId} open={open}/> }
       {openDelete && <DeleteBrand handleClose={handleCloseDeleteModel} openDelete={openDelete} selectedBrandId={selectedBrandId}/> }
       </Box>
      
      
    </div>
  )
}

export default Brands