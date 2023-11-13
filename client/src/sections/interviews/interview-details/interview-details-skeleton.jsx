import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import React from "react";

const InterviewDetailSkeleton = () => {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ width: "100%" }}
            />
          </TableCell>
          <TableCell>
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ width: "100%" }}
            />
          </TableCell>
          <TableCell>
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
