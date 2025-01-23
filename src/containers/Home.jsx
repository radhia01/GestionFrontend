import * as React from 'react';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {getAllRoles} from "../redux/actions/role"
import { useDispatch ,useSelector} from 'react-redux';
import {getAllUsers}from "../redux/actions/user"
import {getAllProducts} from "../redux/actions/products"
import { Typography,Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getAllCategories } from '../redux/actions/category'
import { useMemo } from 'react';
import Stat from './Dashboard/Stat';
import Total from './Dashboard/Total';
import RecentProducts from './Dashboard/RecentProducts';
import ExpiredProducts from './product/ExpiredProducts';
import CategoryCharts from './Dashboard/CategoryCharts';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body3,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A3037',
  }),
})); 
export default function Home() {
  const dispatch=useDispatch()
  const {t}=useTranslation();
  const { users, products, categories } = useSelector(state => ({
      users: state.user.users,
      products: state.product.products,
      categories: state.category.categories,
     }));
     console.log(users)
     
  const currentDate=new Date()
    const getCategoryName=(id)=>{
      const  category= categories && categories.find(element=>element.id===id);
      return category ?  category.name :null
       
    }
   const newProducts = useMemo(() => {
     return products
       ? products
           .map(product => ({
             ...product,
             id_category: getCategoryName(product.id_category)
           }))
       : [];
   }, [products, categories]);
   const columns = [
    
     {
       field: 'name',
       headerName: t("name"),
       width: 240,
       sortable:true,
     },
     {
       field: 'quantity',
       headerName: t('quantity'),
       sortable: true,
       width: 250,
       editable:true
       
   
     },
     
    
     
   ];
const len=Math.ceil(newProducts.length/3);
const recentProducts=newProducts && newProducts.slice(0,len)
const categoryData = useMemo(() => {
  return categories?.map(category => {
    const count = products?.filter(product => product.id_category === category.id).length;
    return { id: category.id, value: count, label: category.name };
  }) || [];
}, [categories, products]);

const data=categories && categories.map(category=>{

  return category.name
})
const values=categories && categories.map(category=>{
  const categoryProducts=products && products.filter(product=>product.id_category===category.id)
   const values=categoryProducts.reduce((prev,current)=>{return prev+current.quantity},0)
  return  values
})
 const productsExpiringSoon=newProducts && newProducts.filter(product=> {

  const expiredDate= new Date(product.expired_date);
  const expiredThreshold=new Date(currentDate.setDate(currentDate.getDate()+10))
  return expiredDate > currentDate && expiredDate <= expiredThreshold;


 })
 const palette = ['lightcoral', 'slateblue'];
  useEffect(() => {
    dispatch(getAllRoles())
     dispatch(getAllUsers())
     dispatch(getAllProducts())
   dispatch(getAllCategories())
  
 }, [dispatch])
  return (
    <div >
    <Box component="section">
    <Stat Item={Item} users={users}/>
    <Total Item={Item} products={products}/>
   
    </Box>
    <Box  component="section"  display="flex"  sx={{padding:1,marginTop:10}}>
      <Box sx={{backgroundColor:"white",border:"1px solid #D9D9D9",marginRight:2}}>
      <Typography align="start"  sx={{fontSize:17,color:"black",padding:1,fontWeight:"bold"}}>{t("recent_products")} </Typography>

      <RecentProducts  recentProducts={recentProducts} columns={columns}/>
      </Box>
 
      <Box sx={{backgroundColor:"white",border:"1px solid #D9D9D9"}}>
      <Typography align="start"  sx={{fontSize:17,color:"black",padding:1,fontWeight:"bold"}}>{t("products_expiring_soon")} </Typography>

       <ExpiredProducts  productsExpiringSoon={productsExpiringSoon} columns={columns} />
      </Box>
  </Box>
 
   <CategoryCharts  categoryData={categoryData} values={values} data={data}  palette={palette} />
  
  </div>
  )
  

  
   
   
  
  
}