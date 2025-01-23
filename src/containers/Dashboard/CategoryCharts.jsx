import { Box, Typography } from '@mui/material'
import { BarChart, PieChart } from '@mui/x-charts'
import React from 'react'
import { useTranslation } from 'react-i18next'
function CategoryCharts({categoryData,values,data,palette}) {
    const {t}=useTranslation()
  return (
    <div>

<Box display="flex"   sx={{marginTop:10}}>
    <Box sx={{ backgroundColor:"white",border:"1px solid #D9D9D9" ,marginRight:10}}>  <Typography align="start"  sx={{fontSize:17,color:"black",padding:1,fontWeight:"bold"}}>{t("products_per_category")} </Typography> <PieChart
    colors={palette}
    
    series={[
      {
        data: categoryData
      },
    ]}
    width={550}
    height={200}
  /></Box>
  
  
  <Box sx={{ backgroundColor:"white",border:"1px solid #D9D9D9"}}>  
    
  <Typography align="start" sx={{fontSize:17,color:"black",padding:1,fontWeight:"bold"}}>{t("total_by_category")} </Typography>
  <BarChart
    xAxis={[{ scaleType: 'band', data: data }]}
    series={[{ data: values}]}
    width={550}
    height={250}
  />
    </Box>
    </Box>
    </div>
  )
}

export default CategoryCharts