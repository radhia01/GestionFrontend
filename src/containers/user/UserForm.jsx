import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

function UserForm({user,handleChange,roles}) {
  return (
    <div>

     <Box display="flex"> 
        <TextField
        name="firstName"
        placeholder='add user firstname'
        label="firstName"
        fullWidth
        sx={{margin:2}}
        onChange={handleChange}
        value={user.firstName}
        >
        </TextField>
         <TextField
        name="lastName"
        placeholder='add user lastname'
        label="lastName"
        fullWidth
        sx={{margin:2}} 
        onChange={handleChange}
        value={user.lastName}
        ></TextField></Box>
        
         <Box display="flex"> <TextField
        name="email"
        placeholder='add user email'
        label="email"
        fullWidth
        type="email"
        sx={{margin:2}}
        onChange={handleChange}
        value={user.email}
        ></TextField>
         <TextField
        name="phone"
        placeholder='add user phone'
        label="phone"
        fullWidth
        sx={{margin:2}} 
        onChange={handleChange}
        value={user.phone}
        ></TextField></Box>
        <FormControl sx={{width:"47%", margin: 2 }}>
          <InputLabel id="category-select-label">role</InputLabel>
              <Select
                id="role-select"
                label="role"
                name="id_role"
                value={user.id_role}
                onChange={handleChange}
              >
                {roles && roles.map(role => (
                  <MenuItem key={role.id} value={role.id}>{role.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
    </div>
  )
}

export default UserForm