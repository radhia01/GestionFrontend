import {axiosInstance} from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
export const getAllCategories=createAsyncThunk("categories/getCategories",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/categories")
     return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// add new category
export const addCategory=createAsyncThunk("categories/addCategory",async({name,toast},thunkAPI)=>{
   try{
      const response=await axiosInstance.post("/api/categories",{name})
      if(response.data){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
      toast.error(error.response.data.message);


   }
} );
// delete category
export const deleteCategory=createAsyncThunk("categories/deleteCategory",async({id,toast})=>{
   try{
      const response=await axiosInstance.delete(`/api/categories/${id}`)
      if(response.data){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
      toast.error(error.response.data.message);
   }
} );
// update category
export const updateCategory=createAsyncThunk("categories/updateCategory",async({name,id,toast})=>{
   try{
      const response=await axiosInstance.put(`/api/categories/${id}`,{name})
      if(response.data){
         toast.success(response.data.message)
      }
     return response.data
   }
   catch(error){
      toast.error(error.response.data.message);

   }
} );