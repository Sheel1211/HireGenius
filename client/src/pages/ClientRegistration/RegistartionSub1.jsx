import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

const RegistartionSub1 = ({ clientData, setClientData }) => {
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    url: "",
    contactno: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [e.target.name]: e.target.value });

    if (name === "name") {
      setErrors({ ...errors, name: validateName(value) });
    } else if (name === "email") {
      setErrors({ ...errors, email: validateEmail(value) });
    } else if (name === "password") {
      setErrors({ ...errors, password: validatePassword(value) });
    } else if (name === "url") {
      setErrors({ ...errors, url: validateURL(value) });
    } else if (name === "contactno") {
      setErrors({ ...errors, contactno: validateMobileNumber(value) });
    }
  };

  const validateName = (name) => {
    if (name.length < 3 || name.length > 10) {
      return "Name length must be between 3 and 10 characters";
    }
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email address";
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const containsUppercase = /[A-Z]/.test(password);
    const containsLowercase = /[a-z]/.test(password);
    const containsNumber = /[0-9]/.test(password);

    if (
      password.length < minLength ||
      !(containsUppercase && containsLowercase && containsNumber)
    ) {
      return "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, and one number.";
    }
    return "";
  };

  const validateURL = (url) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url) ? "" : "Please enter a valid URL";
  };

  const validateMobileNumber = (mobileNumber) => {
    return /^\d{10}$/.test(mobileNumber)
      ? ""
      : "Please enter a valid 10-digit mobile number";
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
            error={!!errors.name}
            helperText={errors.name}
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
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
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
            error={!!errors.url}
            helperText={errors.url}
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
            error={!!errors.contactno}
            helperText={errors.contactno}
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
          <Select
            id="sector"
            name="sector"
            label="sector"
            onChange={handleInputChange}
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

export default RegistartionSub1;
