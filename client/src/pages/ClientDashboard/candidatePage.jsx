import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useEffect } from "react";
import Papa from "papaparse";

const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 130 },
  // {
  //   field: "age",
  //   headerName: "Age",
  //   type: "number",
  //   width: 90,
  // },
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  // },
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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

export default function CandidatePage() {
  const [rows, setRows] = useState([]);

  const [csv, setCsv] = useState(null);
  // const [candidates, setCandidates] = useState([]);

  const [data, setData] = useState([
    { id: 1, name: "n1", email: "e1@gmail.com" },
    { id: 2, name: "n2", email: "e2@gmail.com" },
    { id: 3, name: "n3", email: "e3@gmail.com" },
    { id: 4, name: "n4", email: "e4@gmail.com" },
  ]);

  const handleWriteCSV = () => {
    const csvData = Papa.unparse(data);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleReadCSV = () => {
    if (csv) {
      Papa.parse(csv, {
        header: true,
        complete: (result) => {
          setRows(result.data);
        },
      });
    } else {
      console.log("Please upload file first");
    }
  };

  useEffect(() => {
    console.log("rows", rows);
  }, [rows]);

  return (
    <>
      <Grid container spacing={2} sx={{ width: "100%", paddingLeft: "50px" }}>
        <Grid item xs={4}>
          <input
            accept=".csv"
            className="input csv"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            onChange={(e) => {
              console.log(e.target.files[0]);
              setCsv(e.target.files[0]);
            }}
          />
          <label htmlFor="raised-button-file">
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
              onChange={(e) => {
                setCsv(e.target.files[0]);
              }}
            >
              Upload a file
              <VisuallyHiddenInput type="file" />
            </Button>
          </label>{" "}
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={handleReadCSV}>
            Import file
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={handleWriteCSV}>
            Download CSV Example
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 500, width: "100%", marginTop: "50px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </>
  );
}
