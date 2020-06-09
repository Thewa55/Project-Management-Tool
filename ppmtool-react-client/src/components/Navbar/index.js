import React from "react";
import { Box, Typography, Button } from "@material-ui/core";



export default function Navbar() {
  return (
    <Box display="flex" bgcolor="grey.200" p={2} alignItems="center">
      <Typography><h1 style={{fontFamily : "Dancing Script"}}>Project Management Tool</h1></Typography>
      <Box flexGrow={1} textAlign="right" style={{fontFamily: "typeface-roboto"}}>
        <Button color="primary"><h3>Signup</h3></Button>
        <Button color="primary"><h3>Login</h3></Button>
      </Box>
    </Box>
  );
}
