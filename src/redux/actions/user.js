import {axiosInstance} from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
// add new User 
export const addUser=createAsyncThunk("users/AddUser",async(data,thunkAPI)=>{
   try{
      const response=await axiosInstance.post("/api/users",data)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


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

export const deleteUser=createAsyncThunk("users/deleteUser",async(id,thunkAPI)=>{
   console.log(id)
   try{
      const response=await axiosInstance.delete(`/api/users/${id}`)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// update a User 

export const updateUser=createAsyncThunk("users/updateUser",async({user,id},thunkAPI)=>{
   try{
      const response=await axiosInstance.put(`/api/users/${id}`,user)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
export const getUserPermissions=createAsyncThunk("users/permissions",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get('/api/permissions/user')
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)
   }
} );