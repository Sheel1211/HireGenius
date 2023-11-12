import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Scrollbar from "../../../components/scrollbar";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import Iconify from "../../../components/iconify";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import config from "../../../utils/config";
import InterviewDetailsTableHead from "./table-head";
import InterviewDetailsTableBody from "./table-body";
import InterviewSkeleton from "../skeleton";

const InterviewDetails = () => {
  const [allRounds, setAllRounds] = useState([]);
  const [interviewDetails, setInterviewDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const interview = location.state;
  const navigate = useNavigate();

  const fetchRounds = () => {
    axios
      .get(
        `http://127.0.0.1:4000/api/interview/all-rounds/${interview._id}`,
        config
      )
      .then((res) => {
        setAllRounds(res.data.interview.rounds);
        setInterviewDetails(res.data.interview);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRounds();
  }, []);

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography
            variant="h4"
            onClick={() => navigate("/")}
            sx={{ cursor: "pointer" }}
          >
            {interview.title}
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            gap={4}
          >
            <Button
              variant="contained"
              color="inherit"
              startIcon={<VisibilityIcon />}
            >
              View Candidates
            </Button>
            <Button variant="contained" color="inherit" startIcon={<AddIcon />}>
              Create Round
            </Button>
          </Stack>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <InterviewDetailsTableHead
                  headLabel={[
                    { label: "No", align: "left" },
                    { label: "Title", align: "left" },
                    { label: "Options", align: "center" },
                  ]}
                />
                {isLoading ? (
                  <InterviewSkeleton />
                ) : (
                  <>
                    {allRounds &&
                      allRounds.map((round, index) => (
                        <InterviewDetailsTableBody
                          key={index}
                          round={round}
                          index={index}
                        />
                      ))}
                  </>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </>
  );
};

export default InterviewDetails;
