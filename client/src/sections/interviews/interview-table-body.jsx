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
        <TableRow
          hover
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell
            align="left"
            component="th"
            scope="row"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={getInterviewDetails}
          >
            {interview.title}
          </TableCell>
          <TableCell align="center">{interview.candidates.length}</TableCell>
          <TableCell align="center">{fDate(interview.createdAt)}</TableCell>
          <TableCell align="center">
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
