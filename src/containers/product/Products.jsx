import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { getAllProducts } from '../../redux/actions/products';
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Button, Typography, IconButton, Divider } from '@mui/material';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { toast } from 'react-toastify';
import { resetError, resetResponse } from '../../redux/reducers/product';
import DeleteProduct from "./DeleteProduct";

export default function Products() {
  const { productId,setproductId } = useOutletContext();
  const [selectedProductId, setSelectedProductId] = React.useState(null);
  const { error,response } = useSelector(state => state.product)
//  const isAuth=usePermissions(["view_products"])
  const {t}=useTranslation()
  const navigate=useNavigate()
  const handleOpen=(id)=>{
    setSelectedProductId(id)
    setOpen(true)
  }
    const updateProduct=(id)=>{
      setproductId(id)
      navigate("/add/product")
    }
    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(price);
    };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false)
  const ShowDetails=(id)=>{
    navigate(`/product/${id}`)
  }
  const {products}=useSelector(state=>state.product)
  const newProducts = products?.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: product.quantity,
   
    category: product?.category?.name || "nothing",
    brand:product?.brand?.name,
  })) || [];

  const dispatch=useDispatch()
  useEffect(() => {
   dispatch(getAllProducts())
  }, [dispatch])
  
  const handleUpdate=(params)=>{
    const id=params.id;
    const name=params.name;
    const description=params.description;
    const price=params.price;
    const quantity=params.quantity;
    const data={
      id,
      name,
      description,
      price,
      quantity,

    };
   dispatch(updateProduct(data))
   
       
  }
  useEffect(() => {
   dispatch(resetError())
   dispatch(resetResponse())
  }, [dispatch])
  
  useEffect(() => {
    if(error){
     toast.error(error)
    }
   }, [error])
  //  useEffect(() => {
  //    if(response && response==="delete"){
  //        toast.success(t("success_delete_product"))
  //    }
  //   }, [response])
  const columns = [
    {
      field: 'name',
      headerName: t("name"),
      width: 300,
      sortable:true,
      
    },
    {
      field: 'description',
      headerName: t("description"),
      width: 200,
      editable: true,
    },
    {
      field: 'price',
      headerName: t('price'),
      sortable: true,
      width: 120,
      editable:true,
      renderCell:(params)=>{
        return <span>{formatPrice(params.row.price)}</span>
      }
      
      
    },
    
    {
      field: 'quantity',
      headerName: t('quantity'),
      sortable: true,
      width: 110,
      editable:true
      
  
    },
    {
      field: 'category',
      headerName: t("category"),
      sortable: false,
      width: 160,
  
    },
    {
      field: 'brand',
      headerName: t("brand"),
      sortable: false,
      width: 160,
  
    },
    {
      field: 'action',
      headerName: "Action",
      width: 160,
      renderCell:(params)=>{
        return (
          <div display="flex"  className=" h-full   flex justify-center items-center mt-1 focus:outline-none">
            <IconButton color="error"  onClick={()=>handleOpen(params.id)} 
            sx={{width:30, padding:2,
            height:30,
              "&:hover":{
            color:"white",
            backgroundColor:"red"
          }}}
        >
          <DeleteOutlineRoundedIcon   />
        </IconButton><IconButton onClick={()=>ShowDetails(params.id)}  sx={{
          width:30, padding:2,
            height:30,
            "&:hover":{
            color:"white",
            backgroundColor:"#002333"
          }}}
          >
          < RemoveRedEyeRoundedIcon/>
        </IconButton>
        <IconButton onClick={()=>updateProduct(params.id)} sx={{
          width:30,
          height:30,
          color:"black",
          "&:hover":{
            color:"white",
            backgroundColor:"#159A9C"
          }}}>
          < BorderColorRoundedIcon/>
        </IconButton>
          </div>
          
        )
      }
  
    }
  ];
  return (
    <div>
    <Box sx={{display:"flex",justifyContent:"space-between"}}>
    <Typography align="start"  sx={{my:4,fontSize:22,fontWeight:"bold",color:"#F2C12E"}}>{t("products_list")} </Typography>
   
    <Button onClick={()=>{setproductId(null);
      navigate("/add/product")} } sx={{backgroundColor:"#139950",height:50,px:2,fontSize:11,color:"white"}}><AddIcon/>{t("add_new_product")}</Button>
    </Box>
    <Divider/>
     <Box sx={{  marginTop:4 ,display:"flex",justifyContent:"center"}}>
      <DataGrid
      rowHeight={70}
        rows={newProducts}
        sx={{backgroundColor:"white"}}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        processRowUpdate={handleUpdate}
        onProcessRowUpdateError={error=>{console.log(error)}}
      />
      
    </Box>
    {open && <DeleteProduct open={open} handleClose={handleClose}  selectedProductId={selectedProductId}/>}</div>
   
  );
}