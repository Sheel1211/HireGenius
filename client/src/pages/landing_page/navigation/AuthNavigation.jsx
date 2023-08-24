import Box from '@mui/material/Box'
import { Avatar, Button } from '@mui/material';
import { deepPurple,blue} from '@mui/material/colors';
const AuthNavigation = () => {
  return (
    <Box sx={{ "& button": { mr: 2 } }}>
      {/* <Button variant="outlined" sx={{borderRadius:"1vmax"}}>
        Sign In
      </Button>
      <Button variant="contained" sx={{borderRadius:"1vmax"}}>Sign Up</Button> */}
      <Avatar sx={{ bgcolor: blue[800] ,marginTop:"-1vmax" ,cursor:"pointer"}}>N</Avatar>
    </Box>
  );
};

export default AuthNavigation;
