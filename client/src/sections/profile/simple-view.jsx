import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const startCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  p: 2,
  borderTop: "1px solid #ddd",
  borderLeft: "1px solid #ddd",
  "&:last-child": {
    borderBottom: "1px solid #ddd",
  },
  "&:nth-last-of-type(2)": {
    borderBottom: "1px solid #ddd",
  },
};

const SimpleView = ({ client }) => {
  return (
    <>
      <Grid container spacing={2}>
        {/* Logo */}
        <Grid item xs={12} sm={2} sx={{ ...startCenter }}>
          <Typography variant="h6">Logo</Typography>
        </Grid>
        <Grid item xs={12} sm={10} sx={{ ...startCenter }}>
          {
            <img
              src={client.logo ? client.logo.url : client.logo}
              alt={`${client.name}_logo`}
              loading="lazy"
            />
          }
        </Grid>

        {/* Name */}
        <Grid item xs={12} sm={2} sx={{ ...startCenter }}>
          <Typography variant="h6">Name</Typography>
        </Grid>
        <Grid item xs={12} sm={10} sx={{ ...startCenter }}>
          <Typography variant="body1">{client.name}</Typography>
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={2} sx={{ ...startCenter }}>
          <Typography variant="h6">Email</Typography>
        </Grid>
        <Grid item xs={12} sm={10} sx={{ ...startCenter }}>
          <Typography variant="body1">{client.email}</Typography>
        </Grid>

        {/* About */}
        <Grid item xs={12} sm={2} sx={{ ...startCenter }}>
          <Typography variant="h6">About</Typography>
        </Grid>
        <Grid item xs={12} sm={10} sx={{ ...startCenter }}>
          <Typography variant="body1">{client.description}</Typography>
        </Grid>

        {/* Website */}
        <Grid item xs={12} sm={2} sx={{ ...startCenter }}>
          <Typography variant="h6">Website</Typography>
        </Grid>
        <Grid item xs={12} sm={10} sx={{ ...startCenter }}>
          <Typography variant="body1">{client.url}</Typography>
        </Grid>

        {/* Sector */}
        <Grid item xs={12} sm={2} sx={{ ...startCenter }}>
          <Typography variant="h6">Sector</Typography>
        </Grid>
        <Grid item xs={12} sm={10} sx={{ ...startCenter }}>
          <Typography variant="body1">{client.sector}</Typography>
        </Grid>

        {/* Contact Number */}
        <Grid item xs={12} sm={2} sx={{ ...startCenter }}>
          <Typography variant="h6">Contact No.</Typography>
        </Grid>
        <Grid item xs={12} sm={10} sx={{ ...startCenter }}>
          <Typography variant="body1">{client.contactno}</Typography>
        </Grid>

        {/* Proof */}
        <Grid item xs={12} sm={2} sx={{ ...startCenter }}>
          <Typography variant="h6">Proof</Typography>
        </Grid>
        <Grid item xs={12} sm={10} sx={{ ...startCenter }}>
          <img
            src={
              client.validcertificate
                ? client.validcertificate.url
                : client.validcertificate
            }
            alt={`${client.name}_certificate`}
            sx={{ height: 500, width: 500, objectFit: "contain" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SimpleView;
