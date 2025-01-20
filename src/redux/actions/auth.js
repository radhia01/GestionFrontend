import {axiosInstance} from "../../axios/axios"
import { createAsyncThunk} from "@reduxjs/toolkit"
export const signIn=createAsyncThunk("auth/signIn",async({userData,navigate},thunkAPI)=>{

   try{
      const response=await axiosInstance.post("/api/signIn",userData)
      if(response){
         navigate("/home")
      }
     return response.data
   }
   catch(error){
         return thunkAPI.rejectWithValue(error?.response?.data?.message)
   }
} );
export const signOut=createAsyncThunk("auth/signOut",async(_,thunkAPI)=>{
  
   try{
      const response=await axiosInstance.get("/api/signOut")
        return response.data
   }
   catch(error){
      return  thunkAPI.rejectWithValue(error.response.data.code)

   }
} );
