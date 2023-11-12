import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const InterviewTableHead = ({ headLabel }) => {
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
InterviewTableHead.propTypes = {
  headLabel: PropTypes.array,
};

export default InterviewTableHead;
