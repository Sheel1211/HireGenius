import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import { red } from "@mui/material/colors";

const addresses = ["1 MUI Drive", "Reactville", "Anytown", "99999", "USA"];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const RegistrationSub3 = ({ clientData, validCertificateFile, logoFile }) => {
  const products = [
    {
      name: "Name",
      desc: "",
      price: clientData.name,
    },
    {
      name: "Email",
      desc: "",
      price: clientData.email,
    },
    {
      name: "Password",
      desc: "",
      price: clientData.password,
    },
    {
      name: "Web URL",
      desc: "",
      price: clientData.url,
    },
    { name: "Contact Number", desc: "", price: clientData.contactno },
    { name: "Description", desc: "", price: clientData.description },
    { name: "Sector", desc: "", price: clientData.sector },
  ];

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Certificate Uploaded
            {validCertificateFile ? (
              <CheckCircleIcon sx={{ color: "black" }} />
            ) : (
              <UnpublishedIcon sx={{ color: "grey" }} />
            )}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Logo Uploaded
            {logoFile ? (
              <CheckCircleIcon sx={{ color: "black" }} />
            ) : (
              <UnpublishedIcon sx={{ color: "grey" }} />
            )}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default RegistrationSub3;
