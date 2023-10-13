import React, { Fragment, useState } from "react";
import "./userOptions.css";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { Dashboard, List, Logout, Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/slices/UserSlice";

const UserOptions = ({ user }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userdetails = useSelector((state) => state.User);

  const actions = [
    { icon: <Dashboard />, name: "Dashboard", func: viewDashboard },
    { icon: <List />, name: "Previous Interviews", func: viewList },
    { icon: <Person />, name: "Profile", func: viewProfile },
    { icon: <Logout />, name: "Logout", func: logOutUser },
  ];

  function viewDashboard() {
    navigate("/admin/login");
    handleClose();
  }

  function viewList() {
    handleClose();
  }

  function viewProfile() {
    handleClose();
  }

  function logOutUser() {
    dispatch(logoutUser());

    console.log(userdetails);
    navigate(`/${userdetails.User.role}/login`);
    handleClose();
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", top: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
