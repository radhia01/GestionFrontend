import {createSlice} from "@reduxjs/toolkit"
import { addUser, deleteUser, getAllUsers, getUserPermissions, updateUser } from "../actions/user"
const userSlice=createSlice({
    name:"user",
    initialState:{
        users:null,
        isLoading:false,
        error:null,
        response:null,
        roles:null,
        userPermissions:null
      
    },
    reducers:{
       resetError:(state)=>{
        state.error=null
       },
       resetResponse:(state)=>{
        state.response=null
       },
       setResponse:(state,action)=>{
        state.response=action.payload
       }
    },
    extraReducers:(builder)=>{
        builder.addCase(getAllUsers.pending,(state)=>{
            state.isLoading=true

        });
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isLoading=false
            state.users=action.payload.users
        });
        builder.addCase(getAllUsers.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        });
        builder.addCase(deleteUser.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(deleteUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.users=state.users.filter(user=>user.id!==action.payload)     
                   });
        builder.addCase(deleteUser.rejected,(state,action)=>{
           state.isLoading=false
           state.error=action.payload
                })   
        builder.addCase(addUser.pending,(state)=>{
            state.isLoading=true
          
                           });
        builder.addCase(addUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.users=[...state.users,action.payload]
            state.response="add"
           
                           });
        builder.addCase(addUser.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
                           })         
        builder.addCase(updateUser.pending,(state)=>{
           state.isLoading=true;
         
                                           });
        builder.addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.users=state.users.map(user=>user.id===action.payload.id?action.payload.updatedUser:user)
            
                                           });
        builder.addCase(updateUser.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload  })
        builder.addCase(getUserPermissions.pending,(state,action)=>{
                    state.isLoading=false
                    state.roles=action.payload});  
                                              
        builder.addCase(getUserPermissions.fulfilled,(state,action)=>{
                state.isLoading=false
                state.userPermissions=action.payload});  
        builder.addCase(getUserPermissions.rejected,(state,action)=>{
            state.error=action.payload
                                           })      
       
           
    }
})
export default userSlice.reducer;
export const {resetError,resetResponse,setResponse}=userSlice.actions;