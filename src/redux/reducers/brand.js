import {createSlice} from "@reduxjs/toolkit"
import { addBrand, deleteBrand, getAllBrands, updateBrand } from "../actions/brand";
const brandSlice=createSlice({
    name:"brand",
    initialState:{
        isLoading:false,
        brands:null,
      
    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder.addCase(addBrand.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(addBrand.fulfilled,(state,action)=>{
            state.brands=[...state.brands,action.payload]
          
        });
      
        builder.addCase(getAllBrands.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(getAllBrands.fulfilled,(state,action)=>{
            state.brands=action.payload
        });
        builder.addCase(getAllBrands.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(deleteBrand.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(deleteBrand.fulfilled,(state,action)=>{
            state.brands=state.brands.filter(brand=>brand.id!=action.payload.id)
           
        });
        builder.addCase(deleteBrand.rejected,(state,action)=>{
           state.error=action.payload
        });
        builder.addCase(updateBrand.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(updateBrand.fulfilled,(state,action)=>{
            state.brands=state.brands.map(brand=>brand.id===action.payload.brand.id?action.payload.brand:brand)
            
        });
      
    }

    
})
export default brandSlice.reducer;
