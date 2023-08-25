import React, { useState } from "react";
import ShowQuestion from "./ShowQuestion";
import AllQuestions from "./AllQuestions";
import { Box, Card, Grid } from "@mui/material";
import Header from "./Header";
import NewTab from "../Security/NewTab";
import PreventReload from "../Security/PreventReload";

const index = () => {
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState(0);
  return (
    <Box sx={{ height: "100vh", background: "#eeeeee" }}>
      <Header />
      <Box sx={{ mt: 2 }}>
        {/* <NewTab /> */}
        {/* <PreventReload /> */}
        <Grid container spacing={2} columns={20}>
          <Grid item xs={7}>
            <Card
              sx={{
                height: "85vh",
                overflowY: "auto",
                boxShadow: 2,
                ml: 4,
                mb: 4,
              }}
            >
              <AllQuestions
                selectedQuestionIdx={selectedQuestionIdx}
                setSelectedQuestionIdx={setSelectedQuestionIdx}
              />
            </Card>
          </Grid>
          <Grid item xs={13}>
            <ShowQuestion selectedQuestionIdx={selectedQuestionIdx} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default index;
