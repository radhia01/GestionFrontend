import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import InventoryIcon from '@mui/icons-material/Inventory';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useTranslation } from 'react-i18next';
function Total({Item,products}) {
    const {t}=useTranslation()
    const outOfStock=products && products.filter(product=>product.quantity===0)
    let totalQuantityInStock=0;
    products && products.filter(product=>product.quantity!==0).map(product=>
      totalQuantityInStock=totalQuantityInStock+product.quantity
    )
  return (
    <div>

<Stack direction="row" spacing={3} sx={{marginTop:5}}>
   <Item sx={{padding:3 ,width:290,display:"flex", backgroundColor:"white", color:"black",justifyContent:"space-between",border:"1px solid #D9D9D9"}}>
      <Box><DoDisturbOnIcon sx={{fontSize:50,marginTop:1}}/></Box><Box sx={{  display: "flex",flexDirection:"column"}}>
    
      <Box ><Typography variant="h5">{outOfStock && outOfStock.length}</Typography></Box>
     <Box><Typography sx={{color:"#8C8C8C" ,fontSize:15}}> {t("out_of_stock") }</Typography></Box>
     
     </Box> 
     </Item>
     <Item sx={{padding:3 ,width:290,display:"flex", backgroundColor:"white", color:"black",justifyContent:"space-between",border:"1px solid #D9D9D9"}}>
      <Box><InventoryIcon sx={{fontSize:50,marginTop:1}}/></Box><Box sx={{  display: "flex",flexDirection:"column"}}>
    
      <Box ><Typography variant="h5">{totalQuantityInStock}</Typography></Box>
     <Box><Typography sx={{color:"#8C8C8C" ,fontSize:15}}> {t("Total_quantity_in_stock") }</Typography></Box>
     
     </Box> 
     </Item>
     <Item sx={{padding:3 ,width:280,display:"flex", backgroundColor:"white", color:"black",justifyContent:"space-between",border:"1px solid #D9D9D9"}}>
      <Box><MonetizationOnIcon sx={{fontSize:50,marginTop:1}}/></Box><Box sx={{  display: "flex",flexDirection:"column"}}>
    
      <Box ><Typography variant="h5">0</Typography></Box>
     <Box><Typography sx={{color:"#8C8C8C" ,fontSize:15}}> {t("total_purchase_amount") }</Typography></Box>
     </Box> 
     </Item>
     <Item sx={{padding:3 ,width:290,display:"flex", backgroundColor:"white", color:"black",justifyContent:"space-between",border:"1px solid #D9D9D9"}}>
      <Box><MonetizationOnIcon sx={{fontSize:50,marginTop:1}}/></Box><Box sx={{  display: "flex",flexDirection:"column"}}>
    
      <Box ><Typography variant="h5">0</Typography></Box>
     <Box><Typography sx={{color:"#8C8C8C" ,fontSize:15}}> {t("total_sale_amount") }</Typography></Box>
     
     </Box> 
     </Item>
  </Stack>
    </div>
  )
}

export default Total