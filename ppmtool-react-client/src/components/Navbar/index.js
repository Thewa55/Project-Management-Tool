import React from "react";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'


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
      marginLeft: "3em",
      fontSize: "2.5em",
      [theme.breakpoints.down("xs")]:{
        textAlign: "center",
        marginLeft: "0"
      }
    },
    linkStyle:{
      textDecoration: "none",
      color: "black"
    }
}))

export default function Navbar() {

  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box display="flex" bgcolor="grey.200" alignItems="center">
      <Grid container className={classes.gridStyle}>
        <Grid item xs={12} sm={8}>
          <Link className={classes.linkStyle} to="/">
            <Typography className={classes.typography}>Project Management Tool</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} sm={4} className={classes.gridStyle}>
          <Box flexGrow={1} textAlign="center" style={{fontFamily: "typeface-roboto"}}>
            <Link to="/signup" className={classes.linkStyle}>
              <Button color="primary"><h3>Signup</h3></Button>
            </Link>
            <Link to="/login" className={classes.linkStyle}>
              <Button color="primary"><h3>Login</h3></Button>
            </Link>
          </Box>
        </Grid>  
      </Grid>
    </Box>
  );
}
