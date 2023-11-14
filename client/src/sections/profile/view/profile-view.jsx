import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Container, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import ProfileTable from "../profile-table";
import ProfileSkeleton from "../profile-skeleton";

const ProfileView = () => {
  const [client, setClientData] = useState({});
  const [isSkeletonOpen, setIsSkeletonOpen] = useState(true);

  const user = useSelector((state) => state.User);
  useEffect(() => {
    if (!user.User) {
      return;
    }
    setClientData(user.User);
    setIsSkeletonOpen(false);
  }, [user]);

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Profile</Typography>
        </Stack>
        {isSkeletonOpen ? (
          <ProfileSkeleton />
        ) : (
          <ProfileTable client={client} />
        )}
        {/* <ProfileSkeleton /> */}
        {/* <ProfileTable client={client} /> */}
      </Container>
    </>
  );
};

export default ProfileView;
