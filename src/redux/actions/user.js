import {axiosInstance} from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
// add new User 
export const addUser=createAsyncThunk("users/AddUser",async({user,toast})=>{
   console.log(user)
   try{
      const response=await axiosInstance.post("/api/users",user)
      if(response.data.message){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
      toast.error(error.response.data.message)
   }
} );
// get all Users 

export const getAllUsers=createAsyncThunk("users/getAllUsers",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/users")
      console.log(response.data)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// delete a User 

export const deleteUser=createAsyncThunk("users/deleteUser",async({id,toast})=>{
   try{
      const response=await axiosInstance.delete(`/api/users/${id}`)
      if(response.data.message){
         toast.success(response.data.message)
      }
      console.log(response.data)
      return response.data;
   }
   catch(error){
      toast.error(error.response.data.message)
   }
} );
// update a User 

export const updateUser=createAsyncThunk("users/updateUser",async({id,user,toast})=>{
   try{
      const response=await axiosInstance.put(`/api/users/${id}`,user)
      if(response.data.message){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
      toast.error(error.response.data.message)
   }
} );
// get user permissions
export const getUserPermissions=createAsyncThunk("users/permissions",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get('/api/permissions/user')
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)
   }
} );