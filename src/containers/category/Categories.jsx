import React from 'react'
import {Box,Button,Typography,Modal,Divider,TextField,IconButton} from "@mui/material"
import { useTranslation } from 'react-i18next'
import  {useSelector,useDispatch} from 'react-redux'
import { deleteCategory, getAllCategories, updateCategory } from '../../redux/actions/category'
import { useEffect,useState } from 'react'
import { toast } from 'react-toastify'
import usePermissions from "../../hooks/usePermissions"
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import { useOutletContext } from 'react-router-dom'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
 import AddEditCategory from './AddEditCategory'
import { getAllUsers } from '../../redux/actions/user'
import DeleteCategory from './DeleteCategory'

function Categories() {
  const [open,setOpen]=React.useState(false)
  const [openDelete, setopenDelete] = useState(false)
  const { searchItem } = useOutletContext();
  const [selectedCategoryId, setselectedCategoryId] = useState(null)
  // const isAuth=usePermissions(["view_categories"])
const {users}=useSelector(state=>state.user)
  const handleClose=()=>{
    setOpen(false)
  }
  const handleCloseDeleteModel=()=>{
    setopenDelete(false)
    
  }
  const handleOpenEditModel=(id)=>{
    setOpen(true)
    setselectedCategoryId(id)
  }
  const handleOpenAddModel=()=>{
    setOpen(true);
    setselectedCategoryId(null)
  }
   const handleOpenDeleteModal=(id)=>{
    setselectedCategoryId(id)
    setopenDelete(true)
   }
  const {t}=useTranslation()
  const dispatch=useDispatch()
  const {categories}=useSelector(state=>state.category)
  console.log(users)
  useEffect(() => {
   dispatch(getAllCategories())
   dispatch(getAllUsers())
  }, [])
  const getDate=(date)=>{
    const categoryDate=date.slice(0,10)
    return categoryDate? categoryDate :null
  }
  const newCategories=categories && categories.filter(category=>category.name.toUpperCase().includes(searchItem.toUpperCase()));

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
    // if(!isAuth)
    //   return <Box justifyContent="center"><Typography variant="h4">{t("not_authorized")}</Typography></Box>
  return (
    <div>
       <Box sx={{display:"flex",justifyContent:"space-between"}}>
       <Typography align="start" variant="h5" sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>{t("categories_list")} </Typography>
       <Button onClick={handleOpenAddModel}  sx={{backgroundColor:"#139950",height:50,px:5,fontSize:11,color:"white"}} ><AddIcon/>{t("add_new_category")}</Button>
       </Box>
       <Box   display="flex" justifyContent="center" sx={{width:"90%"}}>
       <DataGrid 
        rowHeight={70}
       sx={{backgroundColor:"white"}}
       columns={columns}
       rows={newCategories}
       >


       </DataGrid>
       {open && <AddEditCategory handleClose={handleClose} selectedCategoryId={selectedCategoryId} open={open}/> }
       {openDelete && <DeleteCategory handleClose={handleCloseDeleteModel} openDelete={openDelete} selectedCategoryId={selectedCategoryId}/> }
       </Box>
       
    </div>
  )
}

export default Categories