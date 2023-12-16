import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

const RegistrationSub1 = ({ clientData, setClientData }) => {
  const handleInputChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const isNameValid = (name) => {
    if (!name) {
      return true;
    }

    return name.length > 3;
  };

  const isEmailValid = (email) => {
    if (!email) {
      return true; // No error if the field is empty
    }

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    if (!password) {
      return true; // No error if the field is empty
    }

    // Regular expressions for password validation
    const minLength = 8;
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
    const containsNumber = /[0-9]/.test(password);

    return (
      password.length >= minLength &&
      containsUppercase &&
      containsLowercase &&
      containsNumber
    );
  };

  const isURLValid = (url) => {
    if (!url) {
      return true; // No error if the field is empty
    }

    // Regular expression for URL validation
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
  };

  const isMobileNumberValid = (mobileNumber) => {
    if (!mobileNumber) {
      return true; // No error if the field is empty
    }

    return mobileNumber.length === 10 && /^\d+$/.test(mobileNumber);
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
            type="text"
            value={clientData.name}
            fullWidth
            variant="standard"
            onChange={handleInputChange}
            error={!isNameValid(clientData.name)}
            helperText={
              !isNameValid(clientData.name)
                ? "Name length must be greater than 3 Characters"
                : ""
            }
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
            error={!isEmailValid(clientData.email)}
            helperText={
              !isEmailValid(clientData.email) ? "Invalid email address" : ""
            }
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="password"
            name="password"
            type="password"
            label="Create password"
            fullWidth
            variant="standard"
            value={clientData.password}
            onChange={handleInputChange}
            error={!isPasswordValid(clientData.password)}
            helperText={
              !isPasswordValid(clientData.password)
                ? "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, and one number."
                : ""
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cpassword"
            name="cpassword"
            type="password"
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
            error={!isURLValid(clientData.url)}
            helperText={
              !isURLValid(clientData.url) ? "Please enter a valid URL" : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="contactno"
            type="number"
            name="contactno"
            label="Enter contact number"
            fullWidth
            value={clientData.contactno}
            variant="standard"
            onChange={handleInputChange}
            error={!isMobileNumberValid(clientData.contactno)}
            helperText={
              !isMobileNumberValid(clientData.contactno)
                ? "Please enter a valid 10-digit mobile number"
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="description"
            name="description"
            label="Enter small description (around 50 words)"
            fullWidth
            value={clientData.description}
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography>Sector</Typography>
          <Select
            id="sector"
            name="sector"
            label="sector"
            onChange={handleInputChange}
            value={clientData.sector}
            fullWidth
            variant="standard"
          >
            <MenuItem value="private">Private</MenuItem>
            <MenuItem value="government">Government</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </>
  );
};

export default RegistrationSub1;
