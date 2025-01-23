import { useTranslation } from 'react-i18next';
import { Box, Stack, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
function Stat({Item,users}) {
  const {t}=useTranslation()
    const getCustomerNumber=()=>{
        const customerNumbers=users?.filter(user=>user.role.name==="CUSTOMER")
        return customerNumbers?.length>0 ? customerNumbers.length:0
 }
   const getSellerNumber=()=>{
    const sellerNumber=users?.filter(user=>user.role.name==="SELLER")
        return sellerNumber?.length>0 ? sellerNumber.length:0
}

const iconData = [
    { icon: PersonIcon, label: "suppliers", color: "#F2C12E" ,fnt:getSellerNumber()},
    { icon: PersonIcon, label: "customers", color: "#1C93FF" ,fnt:getCustomerNumber()},
    { icon: DescriptionIcon, label: "purchase_invoices", color: "#981CFF",fnt:getCustomerNumber() },
    { icon: DescriptionIcon, label: "sales_invoices", color: "#194FE8" ,fnt:getCustomerNumber()},
  ];

  return (
    <div>
        <Stack direction="row" spacing={3}>
      {iconData.map((item,index)=>{
        const Icon=item.icon
        return (
         <Item key={index} sx={{padding:3 ,width:290,display:"flex", backgroundColor:item.color, color:"white",justifyContent:"space-between"}}>
          <Box sx={{  display: "flex",flexDirection:"column"}}>
          <Box ><Typography variant="h5">{item.fnt}</Typography></Box>
         <Box><Typography> {t(item.label) }</Typography></Box></Box>
         <Box><Icon sx={{fontSize:60}}/></Box> </Item>)
          
        

      })}
    
    </Stack>
    </div>
  )
}

export default Stat