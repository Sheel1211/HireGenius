import {
  Container,
  Stack,
  Table,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Scrollbar from "../../components/scrollbar";
import InterviewTableBody from "./interview-table-body";
import InterviewTableHead from "./interview-table-head";
import axios from "axios";
import config from "../../utils/config";
import Cookies from "js-cookie";
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

  // table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
        {/* <InterviewTableToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          /> */}
        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table>
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
                    allInterviews
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((interview, index) => (
                        <InterviewTableBody
                          interview={interview}
                          key={index}
                        ></InterviewTableBody>
                      ))}
                </>
              )}
            </Table>
          </TableContainer>
          {allInterviews && allInterviews.length > 5 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={allInterviews.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Scrollbar>
      </Container>
    </>
  );
};

export default Interviews;
