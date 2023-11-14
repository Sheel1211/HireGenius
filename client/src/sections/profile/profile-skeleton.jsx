import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

const dummyArray = [1, 2, 3, 4, 5];

const columnSx = {
  border: "1px solid #ddd",
  fontSize: 16,
  width: "60%",
  "&:first-of-type": { width: "20%", fontWeight: "bold" },
  "&:last-of-type": { width: "20%" },
};

const ProfileSkeleton = () => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ ...columnSx }}>Label</TableCell>
              <TableCell sx={{ ...columnSx }}>Value</TableCell>
              <TableCell sx={{ ...columnSx }}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dummyArray.map((_, index) => (
              <TableRow key={index}>
                <TableCell sx={{ ...columnSx }}>
                  <Skeleton
                    variant="rectangular"
                    height={40}
                    sx={{ width: "100%" }}
                  />
                </TableCell>
                <TableCell sx={{ ...columnSx }}>
                  <Skeleton
                    variant="rectangular"
                    height={40}
                    sx={{ width: "100%" }}
                  />
                </TableCell>
                <TableCell sx={{ ...columnSx }}>
                  <Skeleton
                    variant="rectangular"
                    height={40}
                    sx={{ width: "100%" }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ProfileSkeleton;
