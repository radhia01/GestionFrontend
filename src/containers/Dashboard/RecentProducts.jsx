import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

function RecentProducts({recentProducts,columns}) {
  return (
    <div>

<Box sx={{  marginTop:1 ,width:"100%"}}>

<DataGrid
 rowHeight={70}
 rows={recentProducts}
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

/>

</Box>
    </div>
  )
}

export default RecentProducts