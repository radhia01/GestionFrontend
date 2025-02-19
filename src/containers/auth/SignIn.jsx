import {
  Box,
  Button,
  Typography,
  TextField
  
 } from '@mui/material';
 import {makeStyles } from "@mui/styles"
 import {toast} from "react-toastify"
 import {useState } from 'react';
 import {signIn} from "../../redux/actions/auth"
 import {useNavigate} from "react-router-dom"
 import {useDispatch,useSelector} from "react-redux"
 import image from "../../assets/computer.jpg"
import React from 'react';
 const useStyles=makeStyles({
  form:{
    backgroundColor:"black",
    color:"white",
    display:"flex",
    flexDirection:"column",
    padding:40
  },
  image: {
    width: "100%",
    height: "100vh", // Fait prendre toute la hauteur à l'image
    objectFit: "cover" // Ajuste l'image pour couvrir le conteneur
  },
  root:{
    display:"flex",backgroundColor:"black",
    height: "100vh",
   overflow: "hidden"
  }
})
 function LoginUser() {
  const styles=useStyles()
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {error}=useSelector(state=>state.auth)
console.log(error)
  const [userData, setuser] = useState({
    email:"",
    password:""
  })
  const handleChange=(e)=>{
    setuser({
      ...userData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(signIn({userData,navigate,toast}))
  }

     
  return (
   <div  className={styles.root} >
     <Box  sx={{width:"50%"}} className={styles.form}>
     <Box display="flex" sx={{justifyContent:"center",margin:5}}><Typography variant="h2" sx={{color:"#F2C12E" ,fontWeight:"bold"}}>ManagePro</Typography></Box>
      <Box  textAlign="center"> <Typography  variant="h4">
       Sign In <span className="text-xl">As Administrator</span>
      </Typography>
      <Typography  sx={{}}>email:admin@gmail.com <br></br>
        password:0000
      </Typography>
      </Box>
      <Box component="form"
      textAlign="center"
      sx={{padding:5}}
      onSubmit={handleSubmit}>
       <TextField
         margin="normal"
         sx={{color:"white",backgroundColor:"white",width:"70%"}}
         onChange={handleChange}
         required
          variant="filled"
         id="email"
         type="email"
         label="Email Address"
         name="email"        
         
        />
        <TextField
         margin="normal"
         onChange={handleChange}
         sx={{color:"white",backgroundColor:"white",width:"70%"}}
         required
         fullWidth
         name="password"
         label="Password"
         type="password"
         id="password"
         variant="filled"
        />
      
       <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 ,width:"70%" ,backgroundColor:"#F2C12E"}}
        >
        Sign In 
       </Button>
      </Box>
     </Box>
   <Box   sx={{width:"50%"}}>< img src={image}   className={styles.image}/></Box>

   </div>
  );
 }
 
 export default LoginUser;
