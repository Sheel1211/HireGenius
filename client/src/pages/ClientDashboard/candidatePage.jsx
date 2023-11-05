import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Grid,
  Button,
  Typography,
  Container,
  Box,
  Dialog,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  DialogActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useState, useEffect } from "react";
import Papa from "papaparse";
import axios from "axios";
import Slide from "@mui/material/Slide";
import { toast, ToastContainer } from "react-toastify";
const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const CustomDialogActions = styled(DialogActions)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ReadCSV = ({ rows }) => {
  if (!rows) return;
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">SN</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default function CandidatePage() {
  const [rows, setRows] = useState(null);
  const [csv, setCSV] = useState(null);
  const [isCSVDialogOpen, setIsCSVDialogOpen] = useState(false);
  const [isTitleDialogOpen, setIsTitleDialogOpen] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [interviewTitle, setInterviewTitle] = useState("");
  const fileInputRef = React.useRef(null);

  const handleCSVDialogOpen = () => {
    setIsCSVDialogOpen(true);
  };

  const handleCSVDialogClose = () => {
    setIsCSVDialogOpen(false);
  };

  const handleTitleDialogOpen = () => {
    if (!rows) {
      toast.error("Please upload the CSV file first!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setIsTitleDialogOpen(true);
  };

  const handleTitleDialogClose = () => {
    setIsTitleDialogOpen(false);
  };

  function createData(id, name, email) {
    return { id, name, email };
  }

  const data = [
    createData(1, "name1", "username1@gmail.com"),
    createData(2, "name2", "username2@gmail.com"),
    createData(3, "name3", "username3@gmail.com"),
    createData(4, "name4", "username4@gmail.com"),
  ];

  const handleReadCSV = (e) => {
    setCSV(e.target.files[0]);
    Papa.parse(e.target.files[0], {
      header: true,
      complete: (result) => {
        if (result.data.length > 0) result.data.pop();
        setRows(result.data);
      },
    });
    setIsFileUploaded(true);
    toast.success("CSV file uploaded!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return;
  };

  const handleShowCandidates = () => {
    if (!rows) {
      toast.error("Please upload the CSV file first!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setIsCSVDialogOpen(true);
  };

  const handleAddCandidates = () => {
    setIsTitleDialogOpen(false);
    if (!interviewTitle || interviewTitle.trim().length === 0) {
      toast.error("Please give Interview Title", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    axios
      .post(
        "http://127.0.0.1:4000/api/client/add/candidates",
        { rows, title: interviewTitle },
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            Here is the format of CSV file...
          </Typography>
          <Button variant="contained" onClick={handleCSVDialogOpen}>
            Demo CSV
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Box>
            <Tooltip title="Upload File">
              <IconButton
                component="label"
                variant="contained"
                onClick={() => fileInputRef.current.click()}
              >
                <CloudUploadIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
            </Tooltip>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={handleReadCSV}
            />
          </Box>
          <Tooltip title="Show Candidates">
            <IconButton onClick={handleShowCandidates}>
              <VisibilityIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Candidates">
            <IconButton onClick={handleTitleDialogOpen}>
              <GroupAddIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>

      <Dialog
        open={isCSVDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCSVDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {isFileUploaded ? <ReadCSV rows={rows} /> : <ReadCSV rows={data} />}
      </Dialog>

      <Dialog
        open={isTitleDialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleTitleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ width: 500, padding: 4, paddingBottom: 2 }}>
          <TextField
            fullWidth
            id="interview-title"
            label="Interview Title"
            variant="outlined"
            onChange={(e) => setInterviewTitle(e.target.value)}
            value={interviewTitle}
          />
        </Box>
        <CustomDialogActions>
          <Button variant="contained" onClick={handleTitleDialogClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleAddCandidates}>
            OK
          </Button>
        </CustomDialogActions>
      </Dialog>
    </>
  );
}
