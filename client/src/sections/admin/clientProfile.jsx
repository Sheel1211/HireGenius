import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import VerifiedIcon from "@mui/icons-material/Verified";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import Cookies from "js-cookie";
const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};

const clientProfile = () => {
  const location = useLocation();
  console.log(location);
  const { selectedID } = location.state;
  const [client, setClientData] = useState({});
  const [open, setOpen] = useState(false);
  const [emailMessage, setEmailMessage] = useState("");

  const navigate = useNavigate();

  const getClientData = () => {
    const token = Cookies.get("token");
    axios
      .get(
        `http://127.0.0.1:4000/api/client/client-data/${selectedID}/` + token,
        config
      )
      .then((res) => {
        console.log(res.data.data);
        setClientData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hanldeApprove = (message, emailId) => {
    const token = Cookies.get("token");
    axios
      .post(
        `http://127.0.0.1:4000/api/admin/verify-client/${selectedID}/` + token,
        { message, emailId },
        config
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success === true) {
          alert("Verified Successfully");
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((error) => {
        alert("Something went wrong!");
      });
    setOpen(false);
    navigate("/admindashboard");
  };

  const hanldeReject = (message, emailId) => {
    const token = Cookies.get("token");
    axios
      .post(
        `http://127.0.0.1:4000/api/admin/reject-client/${selectedID}/` + token,
        { message, emailId },
        config
      )
      .then((res) => {
        if (res.data.success === true) {
          alert("Rejected Successfully");
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((error) => {
        alert("Something went wrong!");
      });
    setOpen(false);
    setOpen(false);
    navigate("/admindashboard");
  };

  useEffect(() => {
    getClientData();
  }, []);

  if (!client) {
    return <>Loading...</>;
  } else {
    return (
      <React.Fragment>
        <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
          <Box sx={{ padding: 5 }}>
            <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
              <img
                src={client.logo ? client.logo.url : client.logo}
                alt={`${client.name}_logo`}
                loading="lazy"
              />
              {client.name}
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Email
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="title"
                  name="title"
                  value={client.email}
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  About
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  id="outlined-multiline-static"
                  value={client.description}
                  multiline
                  fullWidth
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  URL
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  required
                  id="url"
                  name="url"
                  value={client.url}
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Sector
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="author"
                  name="author"
                  value={client.sector}
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Contact
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  id="author"
                  name="author"
                  value={client.contactno}
                  fullWidth
                  size="small"
                  autoComplete="off"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: 700,
                  }}
                >
                  Certificate
                </InputLabel>
              </Grid>
              <Grid item xs={12} sm={4}>
                <img
                  src={
                    client.validcertificate
                      ? client.validcertificate.url
                      : client.validcertificate
                  }
                  alt={`${client.name}_certificate`}
                  loading="lazy"
                  width={550}
                  height={600}
                />
              </Grid>
              <Grid item xs={12} sm={6} />
              <Grid item xs={12} sm={5} />
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setOpen(true)}
                >
                  Verify
                </Button>

                {/* Modal Code */}
                <React.Fragment>
                  <Dialog open={open} onClose={() => setOpen(false)}>
                    {/* <ModalDialog variant="outlined" role="alertdialog"> */}
                    <DialogTitle>
                      <WarningRoundedIcon />
                      Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                      Are you sure you want to Approve this client?
                      <TextField
                        id="author"
                        name="author"
                        fullWidth
                        size="small"
                        placeholder="Write some message"
                        onChange={(e) => setEmailMessage(e.target.value)}
                        autoComplete="off"
                        variant="outlined"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button
                        variant="solid"
                        color="success"
                        endDecorator={<VerifiedIcon />}
                        onClick={() =>
                          hanldeApprove(emailMessage, client.email)
                        }
                        //onClick={() => setOpen(false)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="solid"
                        color="danger"
                        endDecorator={<DeleteForever />}
                        onClick={() => hanldeReject(emailMessage, client.email)}
                        //onClick={() => setOpen(false)}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="plain"
                        color="neutral"
                        onClick={() => setOpen(false)}
                      >
                        Cancel
                      </Button>
                    </DialogActions>
                    {/* </ModalDialog> */}
                  </Dialog>
                </React.Fragment>
              </Grid>
              <Grid item xs={12} sm={5} />
            </Grid>
          </Box>
        </Paper>
      </React.Fragment>
    );
  }
};

export default clientProfile;
