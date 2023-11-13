import {
  Button,
  Card,
  Container,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Iconify from "../../components/iconify";
import Scrollbar from "../../components/scrollbar";
import InterviewTableToolbar from "./interview-table-toolbar";
import InterviewTableBody from "./interview-table-body";
import InterviewTableHead from "./interview-table-head";
import axios from "axios";
import config from "../../utils/config";
import Cookies from "js-cookie";
import Loader from "../../utils/loader";
import { interviewSkeleton } from "../../utils/interview-skeleton";
import InterviewSkeleton from "./interviews-skeleton";

const Interviews = () => {
  const [allInterviews, setAllInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all interviews and set them to the state
  const fetchInterviews = () => {
    const token = Cookies.get("token");
    axios
      .get("http://127.0.0.1:4000/api/interview/all-interviews/" + token, {
        ...config,
      })
      .then((res) => {
        setAllInterviews(res.data.interviews);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  // searchbar

  // const [filterName, setFilterName] = useState("");

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Interviews</Typography>
        </Stack>
        <Card>
          {/* <InterviewTableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}
          <Scrollbar>
            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <InterviewTableHead
                  headLabel={[
                    { label: "Title", align: "left" },
                    { label: "No of candidates", align: "center" },
                    { label: "DOC", align: "center" },
                    { label: "Status", align: "center" },
                  ]}
                ></InterviewTableHead>
                {isLoading ? (
                  <InterviewSkeleton />
                ) : (
                  <>
                    {allInterviews &&
                      allInterviews.map((interview, index) => (
                        <InterviewTableBody
                          interview={interview}
                          key={index}
                        ></InterviewTableBody>
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

export default Interviews;
