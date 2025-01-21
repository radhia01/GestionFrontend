import {axiosInstance} from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
// add new Role 
export const addRole=createAsyncThunk("Roles/AddRole",async(name,thunkAPI)=>{
   try{
      const response=await axiosInstance.post("/api/roles",name)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// get all Roles 

export const getAllRoles=createAsyncThunk("Roles/getAllRoles",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/roles")
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// delete a Role 

export const deleteRole=createAsyncThunk("Roles/deleteRole",async({id,toast})=>{
   try{
      const response=await axiosInstance.delete(`/api/roles/${id}`)
      if(response){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
     toast.error(error.response.data.message)


   }
} );
// update a Role 

export const updateRole=createAsyncThunk("Roles/updateRole",async({id,name,toast})=>{
   try{
      const response=await axiosInstance.put(`/api/roles/${id}`,{id,name})
      if(response.data){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
     toast.error(error.response.data.message)


   }
} );
// add permission to role 

export const addPermissionToRole=createAsyncThunk("Roles/addPermission",async({id_role,id_permission,toast})=>{
   try{
      const response=await axiosInstance.put(`/api/permissions/${id_permission}/roles/${id_role}`)
     if(response?.data?.message){
    toast.success(response.data.message)
     }
     console.log(response.data)
     return response.data
   }
   catch(error){
    toast.error(error?.response?.data?.message)


   }
} );
// get role permissions 
export const getRolePermissions=createAsyncThunk("Roles/getPermissions",async(id,thunkAPI)=>{
  
   try{
      const response=await axiosInstance.get(`/api/permissions/roles/${id}`)
      console.log(response.data)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
export const removeRolePermissions=createAsyncThunk("Roles/removePermissions",async({id_role,id_permission,toast})=>{
   
   try{
      const response=await axiosInstance.delete(`/api/permissions/${id_permission}/roles/${id_role}`)
      console.log(response.data)
      if(response.data){
          toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
      toast.console.error((error.response.data.message));
      


   }
} );