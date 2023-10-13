import { Box, Typography } from '@mui/material'
import React from 'react'

const CompilerForm = () => {
  return (
    <>
        <Box
          sx={{
            flexGrow: 1,
            height: "100vh",
            background: "#eeeeee",
            alignSelf:"center"
          }}
        >
            <Typography sx={{color:"red"}}>Compiler Questions Form</Typography>
        </Box>
    </>
  )
}

export default CompilerForm