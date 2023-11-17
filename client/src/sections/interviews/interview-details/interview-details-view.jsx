import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Scrollbar from "../../../components/scrollbar";
import {
  Button,
  Card,
  Container,
  Dialog,
  DialogTitle,
  Stack,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import config from "../../../utils/config";
import InterviewDetailsTableHead from "./table-head";
import InterviewDetailsTableBody from "./table-body";
import InterviewDetailSkeleton from "./interview-details-skeleton";
import RoundImage from "./round-image";

const InterviewDetails = () => {
  const [allRounds, setAllRounds] = useState([]);
  const [interviewDetails, setInterviewDetails] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const interview = location.state;
  const navigate = useNavigate();

  // fetch all interview rounds

  const fetchRounds = () => {
    axios
      .get(
        `http://127.0.0.1:4000/api/interview/all-rounds/${interview._id}`,
        config
      )
      .then((res) => {
        console.log(res);
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

  // create round
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateRound = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  // return <></>;

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
            <Button
              variant="contained"
              color="inherit"
              onClick={handleCreateRound}
              startIcon={<AddIcon />}
            >
              Create Round
            </Button>
          </Stack>
        </Stack>
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table>
              <InterviewDetailsTableHead
                headLabel={[
                  { label: "No", align: "left" },
                  { label: "Title", align: "left" },
                  // { label: "Link", align: "left" },
                  { label: "Options", align: "center" },
                ]}
              />
              {isLoading ? (
                <InterviewDetailSkeleton />
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
          {!isLoading && allRounds && allRounds.length === 0 && (
            <Stack
              height={200}
              alignItems="center"
              justifyContent="center"
              sx={{ border: "1px solid #ddd" }}
            >
              No Records Found
            </Stack>
          )}
        </Scrollbar>
      </Container>
      <Dialog
        fullWidth
        maxWidth="sm"
        onClose={handleDialogClose}
        open={isDialogOpen}
      >
        <DialogTitle textAlign="center">Create an interview round </DialogTitle>
        <Card>
          <Stack direction="row" gap={4} sx={{ justifyContent: "center" }}>
            <RoundImage
              path={"/assets/round/aptitude.svg"}
              round="Aptitude"
              setIsDialogOpen={setIsDialogOpen}
              interview={interview}
            />
            <RoundImage
              path={"/assets/round/coding.svg"}
              round="Coding"
              setIsDialogOpen={setIsDialogOpen}
              interview={interview}
            />
            <RoundImage
              path={"/assets/round/meet.svg"}
              round="Meet"
              setIsDialogOpen={setIsDialogOpen}
              interview={interview}
            />
          </Stack>
        </Card>
      </Dialog>
    </>
  );
};

export default InterviewDetails;
