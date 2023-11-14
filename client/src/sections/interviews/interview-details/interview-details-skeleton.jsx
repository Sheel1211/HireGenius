import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

const InterviewDetailSkeleton = () => {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell sx={{ border: "1px solid #ddd", fontSize: 16 }}>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ width: "100%" }}
            />
          </TableCell>
          <TableCell sx={{ border: "1px solid #ddd", fontSize: 16 }}>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ width: "100%" }}
            />
          </TableCell>
          <TableCell sx={{ border: "1px solid #ddd", fontSize: 16 }}>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ width: "100%" }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default InterviewDetailSkeleton;
