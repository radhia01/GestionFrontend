import { Box, Button, Divider, Modal, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { removeRolePermissions } from "../../redux/actions/role";
import { toast } from "react-toastify";


export const DeletePermissionFromRole=({open,handleClose,id,idPermission})=>{
    const dispatch=useDispatch()
    const {t}=useTranslation()
    // const isAuth=usePermissions(["delete_permission_from_role"])
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      textAlign:"center",
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      fontSize:20
    
    };
      const handleDeleteCategory=()=>{
       
          dispatch(removeRolePermissions({id_role:id,id_permission:idPermission,toast}))
          handleClose();
  
        }
         
       
    //     if(!isAuth) return (
    //       <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //   >
    //     <Box sx={style}>
    //       <Typography id="modal-modal-title"  variant="h4">
    //     {t("not_authorized")}
    //       </Typography>
    //       <Divider/>
          
    //     </Box>
    //   </Modal>
    //     )  
        
        
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
        {t("confirm_delete_category")}
          </Typography>
          <Divider/>
          <Box sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Button variant="contained" sx={{margin:2,backgroundColor:"green"}} onClick={()=>{
              handleDeleteCategory();
              handleClose()
            }}>{t("yes")}</Button>
            <Button variant="contained" sx={{margin:2,backgroundColor:"red"}} onClick={handleClose}>{t("no")}</Button>
          </Box>
        </Box>
      </Modal> 
      
    </div>
    )
  }

export default DeletePermissionFromRole