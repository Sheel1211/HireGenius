import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const InterviewDetailsTableHead = ({ headLabel }) => {
  return (
    <>
      <TableHead>
        <TableRow>
          {headLabel.map((headCell, index) => (
            <TableCell
              key={index}
              align={headCell.align}
              sx={{ width: headCell.width, minWidth: headCell.minWidth }}
            >
              {headCell.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  );
};

export default InterviewDetailsTableHead;
