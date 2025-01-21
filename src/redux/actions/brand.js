import {axiosInstance} from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
// add new brand 
export const addBrand=createAsyncThunk("brands/AddBrand",async({name,toast})=>{
   try{
      const response=await axiosInstance.post("/api/brands",{name})
      if(response.data){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
      toast.error(error.response.data.message);
   }
} );
// get all brands 

export const getAllBrands=createAsyncThunk("brands/getAllBrands",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/brands")
      console.log(response)
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// delete a brand 

export const deleteBrand=createAsyncThunk("brands/deleteBrand",async({id,toast})=>{
   console.log(id)
   try{
      const response=await axiosInstance.delete(`/api/brands/${id}`)
      if(response.data){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
      toast.error(error.response.data.message);
   }
} );
// update a brand 

export const updateBrand=createAsyncThunk("brands/updateBrand",async({id,name,toast})=>{
   try{
      const response=await axiosInstance.put(`/api/brands/${id}`,{name})
      if(response.data){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
      toast.error(error.response.data.message);

   }
} );