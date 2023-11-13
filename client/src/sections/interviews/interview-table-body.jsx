import { TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";
import Label from "../../components/label";
import { useNavigate } from "react-router-dom";
import { fDate } from "../../utils/format-time";

const InterviewTableBody = ({ interview }) => {
  const navigate = useNavigate();

  const getInterviewDetails = () => {
    navigate(`/${interview.title.split(" ").join("-").toLowerCase()}`, {
      state: interview,
    });
  };

  return (
    <>
      <TableBody>
        <TableRow hover>
          <TableCell
            align="left"
            component="th"
            scope="row"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              border: "1px solid #ddd",
            }}
            onClick={getInterviewDetails}
          >
            {interview.title}
          </TableCell>
          <TableCell align="center" sx={{ border: "1px solid #ddd" }}>
            {interview.candidates.length}
          </TableCell>
          <TableCell align="center" sx={{ border: "1px solid #ddd" }}>
            {fDate(interview.createdAt)}
          </TableCell>
          <TableCell align="center" sx={{ border: "1px solid #ddd" }}>
            {/* <Label color={interview.status === "Yes" ? "success" : "error"}>
              {interview.status}
            </Label> */}
            <Label color={"warning"}>In Progress</Label>
            {/* <Label color={"success"}>Completed</Label> */}
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default InterviewTableBody;
