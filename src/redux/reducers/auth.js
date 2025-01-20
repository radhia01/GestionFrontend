import {createSlice} from "@reduxjs/toolkit"
  
import {signIn, signOut} from "../actions/auth"
const authReducer=createSlice({
  
    name:"auth",
    initialState:{
        user:null,
        error:null,
        language:"fr"
    },
     reducers:{
        setLanguage:(state,action)=>{
            state.language=action.payload
        }
     },
     extraReducers:(builder)=>{
builder.addCase(signIn.pending,(state)=>{
    state.loading=false 
});
builder.addCase(signIn.fulfilled,(state,action)=>{
    state.loading=false
    state.user=action.payload.user
});
builder.addCase(signIn.rejected,(state,action)=>{
    state.error=action.payload
    
});
builder.addCase(signOut.pending,(state)=>{
    state.loading=false 
});
builder.addCase(signOut.fulfilled,(state)=>{
    
    state.user=null
    
});
builder.addCase(signOut.rejected,(state,action)=>{
    state.loading=false
    state.error=action.payload
    
})
     }
})
export  default authReducer.reducer;
export const {setLanguage}=authReducer.actions;
