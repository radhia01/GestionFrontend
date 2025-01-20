import {axiosInstance,axiosProduct} from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
export const getAllProducts=createAsyncThunk("products/getProducts",async(_,thunkAPI)=>{
   try{
      const response=await axiosInstance.get("/api/products")
     return response.data
   }
   catch(error){
      console.log(error.response)
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// delete product 
export const deleteProduct=createAsyncThunk("products/deleteProduct",async(id,thunkAPI)=>{
   try{
      const response=await axiosInstance.delete(`/api/products/${id}`)
     return response.data
   }
   catch(error){
   
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );
// add new product 
export const addProduct=createAsyncThunk("products/addProduct",async({form,toast},thunkAPI)=>{
  
   try{
      const response=await axiosProduct.post(`/api/products`,form)
      if(response){
         toast.success("product added successfully .... ")
      }
     return response.data
   }
   catch(error){
       toast.error(error.response.data.message)
      return  thunkAPI.rejectWithValue(error.response.data.message)


   }
} );
// update product 
export const updateProduct=createAsyncThunk("products/updateProduct",async(data,thunkAPI)=>{
   try{
      const {name,price,description,quantity,id,expired_date,created_on}=data;
      const response=await axiosInstance.put(`/api/products/${id}`,{
         name,
      description,
      price,
      quantity,
      expired_date,
      created_on
      })
     return response.data
   }
   catch(error){
   
      return  thunkAPI.rejectWithValue(error.response.data.code)


   }
} );