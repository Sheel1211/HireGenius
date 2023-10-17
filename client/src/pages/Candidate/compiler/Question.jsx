import { Chip, Divider, Typography } from "@mui/material";
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
          <Chip label="Hard" color="error" />
        )}
      </Box>
      <Divider />

      <Typography variant="h5" sx={{ padding: "1vmax" }}>
        {question.problemStatement}
      </Typography>

      <Divider />

      <Typography variant="h4" sx={{ padding: "1vmax" }}>
        TestCases:
      </Typography>
      <Typography variant="h4" sx={{ padding: "1vmax" }}>
        {/* {question.testcases.input} */}
      </Typography>
      <Typography variant="h4" sx={{ padding: "1vmax" }}>
        {/* {question.testcases.output} */}
      </Typography>
    </Box>
  );
};

export default Question;
