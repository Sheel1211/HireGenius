import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

const InterviewDetailsTableBody = ({ round, index }) => {
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
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          >
            {index + 1}
          </TableCell>
          <TableCell
            align="left"
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          >
            {round.name}
          </TableCell>
          <TableCell
            align="center"
            sx={{ border: "1px solid #ddd", fontSize: 16 }}
          >
            <Button variant="contained" color="inherit">
              Send Mail
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default InterviewDetailsTableBody;
