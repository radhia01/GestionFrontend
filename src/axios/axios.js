import axios from "axios"
export const axiosInstance=axios.create({
    baseURL:"https://gestionproserver.onrender.com/",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",

       
    }
})
export const axiosProduct=axios.create({
    baseURL:"https://gestionproserver.onrender.com/",
    withCredentials:true,
    headers:{
        "Content-Type":"multipart/form-data",

       
    }
})
