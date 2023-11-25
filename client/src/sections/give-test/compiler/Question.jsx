import React from "react";
import { Chip, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Divider } from "@mui/material";
import { Box } from "@mui/system";

const Question = ({ question }) => {
  return (
    <Box sx={{ height: "100vh" }}>
      <Typography variant="h4" sx={{ margin: "1vmax" }}>
        {question.title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "1vmax",
        }}
      >
        {question.difficulty === "easy" ? (
          <Chip label="Easy" color="success" />
        ) : question.difficulty === "medium" ? (
          <Chip label="Medium" color="warning" />
        ) : (
          <Chip label="Hard" color="error" />)
        }
      </Box>
      <Divider />

      <Typography variant="h5" sx={{ padding: "1vmax" }}>
        {question.problemStatement}
      </Typography>

      <Divider />

      <Typography variant="h4" sx={{ padding: "1vmax" }}>
        Test Cases:
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Test Case</TableCell>
              <TableCell>Input</TableCell>
              <TableCell>Output</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {question.testcases.map((testcase, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{testcase.input}</TableCell>
                <TableCell>{testcase.output}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Question;
