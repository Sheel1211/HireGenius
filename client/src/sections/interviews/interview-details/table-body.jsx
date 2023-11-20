import { Button, TableBody, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const InterviewDetailsTableBody = ({ round, index }) => {
  const [interviewRound, setInterviewRound] = useState("");

  const fetchAptitudeDetails = () => {
    axios
      .get("http://127.0.0.1:4000/api/aptitude/details/" + round.roundId)
      .then((res) => {
        setInterviewRound(res.data.aptitude);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (round.name === "Aptitude") {
      fetchAptitudeDetails();
    }
  }, []);

  // round details

  const navigate = useNavigate();
  const params = useParams();
  const getRoundDetails = (roundNumber) => {
    const route = "/" + params.interview + "/" + interviewRound._id;
    navigate(route, {
      state: { ...interviewRound, round, roundNumber },
    });
  };

  return (
    <>
      <TableBody>
        <TableRow
          hover
          // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell
            align="left"
            component="th"
            scope="row"
            sx={{
              fontWeight: "bold",
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          >
            {index + 1}
          </TableCell>
          <TableCell
            align="left"
            sx={{
              fontWeight: "bold",
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          >
            {round.name}
          </TableCell>
          {/* <TableCell
            align="left"
            sx={{
              fontWeight: "bold",
              border: "1px solid #ddd",
              fontSize: 16,
            }}
          >
            {interviewRound.testLink}
          </TableCell> */}
          <TableCell
            align="center"
            sx={{ border: "1px solid #ddd", fontSize: 16 }}
          >
            <Button
              variant="contained"
              color="inherit"
              onClick={() => getRoundDetails(index + 1)}
            >
              View Details
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default InterviewDetailsTableBody;
