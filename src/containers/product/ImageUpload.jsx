import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material'
import React from 'react'
import InfoIcon from '@mui/icons-material/Info';
function ImageUpload({handleFiles,files}) {
  return (
    <div>
        <Box sx={{display:"flex",padding:2}} ><InfoIcon/><Typography >Images (optional)</Typography>
       
       </Box> 
        < input  type="file" id="image" multiple  style={{display:"none"}} onChange={handleFiles}/>
        <Box  display="flex" sx={{margin:2 ,justifyContent:"space-between"}}>
        
        <Button  variant="outlined"sx={{height:100}} onClick={()=>document.getElementById("image").click()}>Add Images </Button>
       
        <Box  >
     

     {/* <ImageList sx={{ width: 700, height: 200 }} cols={3} rowHeight={100}>
{ProductImages && ProductImages.map((image) => (
  <ImageListItem key={image.img}>
    <img
      srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
      src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
      loading="lazy"
    />
  </ImageListItem>

))}

</ImageList>
*/}


<ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {files.map((file) => (
        <ImageListItem key={file.img}>
          <img
            className='w-10 h-10'
            src={URL.createObjectURL(file)}
            alt={file.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
      </Box>
     </Box>
    </div>
  )
}

export default ImageUpload