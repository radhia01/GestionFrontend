import { Button, Typography } from '@mui/material'
import React, { useState } from 'react'


function Unauthorized() {

  
  return (
    open&& <div className='inset-0 bg-black bg-opacity-50 fixed top-0 left-0 flex justify-center items-center'>
      <div className="w-full max-w-lg bg-white rounded-lg p-10 flex flex-col space-y-5 ">
      <Typography variant='h4' color='red'> You are not authorized</Typography>
     
      </div>
      
    </div>
  )
}

export default Unauthorized