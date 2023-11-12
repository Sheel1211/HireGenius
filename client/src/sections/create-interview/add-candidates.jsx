import * as React from "react";
import { Button, Typography, Stack } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { dummyCSVData } from "../../utils/dummy-csv-data";
import DemoReadCSV from "./demo-read-csv";

const AddCandidates = ({ csv, fileInputRef, handleReadCSV }) => {
  return (
    <>
      <Stack direction="column" justifyContent="space-between" gap={2}>
        <Typography variant="body1" sx={{ marginRight: 2 }}>
          Here is the format for CSV file
        </Typography>
        <DemoReadCSV rows={dummyCSVData} />
        <Stack direction="row" alignItems="center" gap={4} sx={{ pt: 4 }}>
          <Button
            color="inherit"
            variant="contained"
            onClick={() => fileInputRef.current.click()}
            startIcon={<CloudUploadIcon />}
          >
            Upload CSV
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleReadCSV}
          />
          <Typography>{csv && csv.name}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default AddCandidates;
