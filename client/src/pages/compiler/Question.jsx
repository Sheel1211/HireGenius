import { Chip, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Question = () => {
  return (
    <Box sx={{height:"100vh"}}>
        <Typography variant="h4" sx={{margin:"1vmax"}}>Chocolate Distribution Problem</Typography>
        <Box sx={{display:"flex",alignItems:"center",flexDirection:"row",justifyContent:"space-between",margin:"1vmax"}}>
        <Chip label="Easy" color="success" />
            <Typography variant="h6">
            Accuracy:70%
            </Typography>
            <Typography variant="h6">
                Submissions: 27K
            </Typography>
        </Box>
        <Divider />

        <Typography variant="h5" sx={{padding:"1vmax"}}>
        Given an array A[ ] of positive integers of size N, where each value represents the number of chocolates in a packet. Each packet can have a variable number of chocolates. There are M students, the task is to distribute chocolate packets among M students such that :
1. Each student gets exactly one packet.
2. The difference between maximum number of chocolates given to a student and minimum number of chocolates given to a student is minimum.
        </Typography>

        <Divider />

        <Typography variant="h4" sx={{padding:"1vmax"}}>
          Constraints:
        </Typography>
        <Typography variant="h5" sx={{padding:"1vmax"}}>
          1 &lt;= nums.length &lt;= 200

        </Typography>
    </Box>
  );
}

export default Question