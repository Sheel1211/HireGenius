import React, { useEffect } from "react";
import {
  Box,
  Checkbox,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import { styled, alpha } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
// import Iconify from "../ClientDashboard/components/iconify";
// import Label from "../ClientDashboard/components/label";
// import Scrollbar from "../ClientDashboard/components/scrollbar";
import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useState } from "react";
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  MenuItem,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Iconify from "../../components/iconify";
import Label from "../../components/label";
import Scrollbar from "../../components/scrollbar";
import Cookies from "js-cookie";
import { getUserDetails } from "../../store/slices/UserSlice";
const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
  withCredentials: true,
};

const adminDashboard = () => {
  const [selectedID, setSelectedID] = useState(null);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [USERLIST, setUSERLIST] = useState([]);

  const navigate = useNavigate();

  const adminData = useSelector((state) => state.User);
  console.log("adminData", adminData);

  const getAllPendingClientsData = () => {
    const token = Cookies.get("token");
    axios
      .get("http://127.0.0.1:4000/api/admin/getall-clients/" + token, config)
      .then((res) => {
        setUSERLIST(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllApprovedClientsData = () => {
    const token = Cookies.get("token");
    axios
      .get(
        "http://127.0.0.1:4000/api/admin/getall-approved-clients/" + token,
        config
      )
      .then((res) => {
        setUSERLIST(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllRejectedClientsData = () => {
    const token = Cookies.get("token");
    axios
      .get(
        "http://127.0.0.1:4000/api/admin/getall-rejected-clients/" + token,
        config
      )
      .then((res) => {
        setUSERLIST(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllPendingClientsData();
  }, []);

  const seeClientProfile = (selectedID) => {
    console.log(selectedID);
    navigate("/admin/client-profile", {
      state: { selectedID },
    });
  };

  const TABLE_HEAD = [
    { id: "name", label: "Name", alignRight: false },
    { id: "email", label: "Email", alignRight: false },
    { id: "url", label: "URL", alignRight: false },
    { id: "contactno", label: "Contact", alignRight: false },
    { id: "sector", label: "Sector", alignRight: false },
    { id: "approved", label: "Verified", alignRight: false },
    { id: "View", label: "View" },
  ];

  // CANDIDATE LIST HEAD ----------------------------------------------------------------------------------------------
  const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: "1px",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    clip: "rect(0 0 0 0)",
  };

  CandidateListHead.propTypes = {
    order: PropTypes.oneOf(["asc", "desc"]),
    orderBy: PropTypes.string,
    rowCount: PropTypes.number,
    headLabel: PropTypes.array,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func,
    onSelectAllClick: PropTypes.func,
  };

  function CandidateListHead({
    order,
    orderBy,
    rowCount,
    headLabel,
    numSelected,
    onRequestSort,
    onSelectAllClick,
  }) {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {headLabel.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.alignRight ? "right" : "left"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  // CANDIDATE LIST TOOLBAR -----------------------------------------------------------------------------------------
  const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1, 0, 3),
  }));

  const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(["box-shadow", "width"], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    "&.Mui-focused": {
      width: 320,
      // boxShadow: theme.customShadows.z8,
    },
    "& fieldset": {
      borderWidth: `1px !important`,
      borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
  }));

  CandidateListToolbar.propTypes = {
    numSelected: PropTypes.number,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
  };

  function CandidateListToolbar({ numSelected, filterName, onFilterName }) {
    return (
      <StyledRoot
        sx={{
          ...(numSelected > 0 && {
            color: "primary.main",
            bgcolor: "primary.lighter",
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component="div" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder="Search user..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <Iconify icon="eva:trash-2-fill" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <Iconify icon="ic:round-filter-list" />
            </IconButton>
          </Tooltip>
        )}
      </StyledRoot>
    );
  }

  // MAIN -------------------------------------------------------------------------------------------------------------

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(
        array,
        (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleOpenMenu = (event, id) => {
    setSelectedID(id);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setSelectedID(null);
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;
  if (!USERLIST) {
    return <>Loading...</>;
  } else {
    return (
      <>
        <Container>
          <Typography variant="h4" gutterBottom mb={5}>
            Admin {adminData?.User?.email}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={3}
          >
            <Button variant="contained" onClick={getAllPendingClientsData}>
              Pending Clients
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={getAllApprovedClientsData}
            >
              Approved Clients
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={getAllRejectedClientsData}
            >
              Rejected Clients
            </Button>
          </Stack>

          <Card>
            <CandidateListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <CandidateListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          _id,
                          name,
                          email,
                          url,
                          contactno,
                          approved,
                          sector,
                        } = row;
                        const selectedUser = selected.indexOf(name) !== -1;

                        return (
                          <React.Fragment key={_id}>
                            <TableRow
                              hover
                              tabIndex={-1}
                              role="checkbox"
                              selected={selectedUser}
                            >
                              {/* {console.log(_id)} */}
                              <TableCell padding="checkbox">
                                <Checkbox
                                  checked={selectedUser}
                                  onChange={(event) => handleClick(event, name)}
                                />
                              </TableCell>

                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                              >
                                <Stack
                                  direction="row"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  {/* <Avatar alt={name} src={avatarUrl} /> */}
                                  <Typography variant="subtitle2" noWrap>
                                    {name}
                                  </Typography>
                                </Stack>
                              </TableCell>

                              <TableCell align="left">{email}</TableCell>

                              <TableCell align="left">{url}</TableCell>
                              <TableCell align="left">{contactno}</TableCell>

                              <TableCell align="left">{sector}</TableCell>
                              <TableCell align="left">
                                <Label color={approved ? "success" : "error"}>
                                  {approved ? "Yes" : "No"}
                                </Label>
                              </TableCell>

                              <TableCell align="right">
                                <Button
                                  variant="outlined"
                                  onClick={() => seeClientProfile(_id)}
                                >
                                  Profile
                                </Button>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        );
                      })}

                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>

                  {isNotFound && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                          <Paper
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Typography variant="h6" paragraph>
                              Not found
                            </Typography>

                            <Typography variant="body2">
                              No results found for &nbsp;
                              <strong>&quot;{filterName}&quot;</strong>.
                              <br /> Try checking for typos or using complete
                              words.
                            </Typography>
                          </Paper>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Scrollbar>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </>
    );
  }
};

export default adminDashboard;
