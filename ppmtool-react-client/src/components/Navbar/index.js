import React from "react";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    gridStyle:{
      [theme.breakpoints.down("xs")]:{
        justifyContent: "center"
      }
    },
    linksGrid:{
      [theme.breakpoints.down("xs")]:{
        justifyContent: "center",
        paddingTop: "0"
      }
    },
    typography:{
      fontFamily : "Dancing Script",
      marginLeft: "8em",
      [theme.breakpoints.down("xs")]:{
        textAlign: "center",
        marginLeft: "0"
      }
    }
}))

export default function Navbar() {

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box display="flex" bgcolor="grey.200" alignItems="center">
      <Grid container className={classes.gridStyle}>
        <Grid item xs={12} sm={8}>
          <Typography className={classes.typography}><h1>Project Management Tool</h1></Typography>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.gridStyle}>
          <Box flexGrow={1} textAlign="center" style={{fontFamily: "typeface-roboto"}}>
            <Button color="primary"><h3>Signup</h3></Button>
            <Button color="primary"><h3>Login</h3></Button>
          </Box>
        </Grid>  
      </Grid>
    </Box>
  );
}
