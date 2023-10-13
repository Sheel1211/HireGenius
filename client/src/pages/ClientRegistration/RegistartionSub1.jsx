import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';

const RegistartionSub1 = ({clientData, setClientData}) => {


    const handleInputChange = (e) => {
            setClientData({ ...clientData, [e.target.name]: e.target.value });
          };

 
  return (
    <>
     <Typography variant="h6" gutterBottom>
      Fill Form
    </Typography>
    <Grid container spacing={3}>
        
    <Grid item xs={12}>
        <TextField
          required
          id="name"
          name="name"
          label="Enter name"
          value={clientData.name}
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="email"
          name="email"
          value={clientData.email}

          label="Enter email"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="password"
          name="password"
          type='password'
          label="Create password"
          fullWidth
          variant="standard"
          value={clientData.password}

          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="cpassword"
          name="cpassword"
          type='password'
          value={clientData.cpassword}

          label="Confirm password"
          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="url"
          name="url"
          label="Website url"
          value={clientData.url}

          fullWidth
          variant="standard"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="contactno"
          type='number'
          name="contactno"
          label="Enter contact number"
          fullWidth
          value={clientData.contactno}

          variant="standard"
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="description"
          name="description"
          label="Enter small description"
          fullWidth
          value={clientData.description}

          variant="standard"
          onChange={handleInputChange}
        />
      </Grid>
    
      <Grid item xs={12}>
        <Select
          id="sector"
          name="sector"
          label="sector"
          onChange={handleInputChange}
          fullWidth
          variant="standard"
        >
          <MenuItem  value="private">Private</MenuItem>
          <MenuItem  value="government">Government</MenuItem>
          <MenuItem  value="other">Other</MenuItem>
        </Select>
      </Grid>
    </Grid>

  </>
  )
}

export default RegistartionSub1
