import {axiosInstance} from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
export const getAllPermissions=createAsyncThunk("permissions/getpermissions",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/permissions")
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// add new permission
export const addPermission=createAsyncThunk("permissions/addPermission",async({name,toast})=>{
   try{
      const response=await axiosInstance.post("/api/permissions",{name})
      if(response.data.message){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
     toast.error(error.response.data.message)
   }
} );
// delete permission
export const deletePermission=createAsyncThunk("permissions/deletePermission",async({id,toast})=>{
   try{
      const response=await axiosInstance.delete(`/api/permissions/${id}`)
      if(response.data.message){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
     toast.error(error.response.data.message)


   }
} );
// update permission
export const updatePermission=createAsyncThunk("permissions/updatePermission",async({id,name,toast})=>{
   try{
      const response=await axiosInstance.put(`/api/permissions/${id}`,{id,name})
      if(response.data.message){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
      toast.error((error.response.data.message))


   }
} );