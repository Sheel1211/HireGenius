import React from "react";
import { interviewSkeleton } from "../../utils/interview-skeleton";
import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";

const InterviewSkeleton = () => {
  return (
    <>
      {interviewSkeleton.map((_, index) => (
        <TableBody key={index}>
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
            <TableCell>
              <Skeleton
                variant="rectangular"
                height={40}
                sx={{ width: "100%" }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </>
  );
};

export default InterviewSkeleton;
