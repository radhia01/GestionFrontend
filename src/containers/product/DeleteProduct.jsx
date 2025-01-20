
import {Modal,Box,Typography,Divider,Button} from '@mui/material';
import {useTranslation} from "react-i18next"
import usePermissions from '../../hooks/usePermissions';
import {useDispatch} from "react-redux"
import { deleteProduct } from '../../redux/actions/products';
 const DeleteModal=({open,handleClose,selectedProductId})=>{
  
    const dispatch=useDispatch()
     const {t}=useTranslation()
      // const isAuth=usePermissions(["delete_product"])
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      textAlign:"center",
      borderRadius:"20px"
    };
      const handleDeleteProduct=()=>{
        dispatch(deleteProduct(selectedProductId))
        
      }
      // if(!isAuth)
      //   return   <Modal
      //   open={open}
      //   onClose={handleClose}
      //   aria-labelledby="modal-modal-title"
      //   aria-describedby="modal-modal-description"
      // >
      //   <Box sx={style}>
          
        
      //     <Box display="flex" justifyContent="center" sx={{padding:20}}> <Typography variant="h4">{t("not_authorized")}</Typography></Box>
      //   </Box>
      // </Modal>
      
    return (
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title"  component="h2">
        {t("confirm_delete_product")}
          </Typography>
          <Divider/>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Button variant="contained" sx={{margin:2,backgroundColor:"green"}} onClick={()=>{
              handleDeleteProduct();
              handleClose()
            }}>{t("yes")}</Button>
            <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
          </Box>
        </Box>
      </Modal>
      
    </div>
    )
  }
export default DeleteModal