import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Landing from '../landing_page/Landing';

const ErrorPage = () => {
    const navigate=useNavigate();

    const navigateToHome=()=>{
        navigate("/")
    }
  return (
    <Box textAlign="center" sx={{my:30}}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" paragraph>
        The page you are looking for does not exist.
      </Typography>
      <Button
        onClick={navigateToHome}
        variant="contained"
        color="primary"
      >
        Back to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
