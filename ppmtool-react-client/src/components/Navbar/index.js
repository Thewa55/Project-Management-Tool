import React from "react";
import { Box, Typography, Button, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../utils/logout'


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
      color: "black",
      marginRight: "1em"
    },
    buttonStyle:{
      margin: "inherit",
      [theme.breakpoints.down("xs")]:{
        marginBottom: "1em"
      }
    }
}))


export default function Navbar() {
  const jwtToken = localStorage.jwtToken;
  const dispatch = useDispatch();
  
  const classes = useStyles();
  let NavbarLinks;

  const userLogout = () => {
    dispatch(logout())
    window.location.href="/"
  }

  let user = useSelector(state => (
    state.security
  ))

  console.log(user.user)

  const NotAuthNavbar = (
      <Grid item xs={12} sm={4} className={classes.gridStyle}>
        <Box flexGrow={1} textAlign="center" style={{fontFamily: "typeface-roboto"}}>
          <Link to="/signup" className={classes.linkStyle}>
            <Button className={classes.buttonStyle} variant="outlined" size="small">
              Sign up
            </Button>
          </Link>
          <Link to="/login" className={classes.linkStyle}>
            <Button className={classes.buttonStyle} variant="outlined" size="small">
              Log In
            </Button>
          </Link>
        </Box>
      </Grid>
  )
  

  const AuthNavbar = (
      <Grid item xs={12} sm={4} className={classes.gridStyle}>
        <Box flexGrow={1} textAlign="center" style={{fontFamily: "typeface-roboto"}}>
        <Link to="/signup" className={classes.linkStyle}>
            <Button className={classes.buttonStyle} variant="outlined" size="small">
              Dashboard
            </Button>
          </Link>
          <Link to="/" className={classes.linkStyle}>
            <Button onClick={userLogout} className={classes.buttonStyle}  variant="outlined" size="small">
              Log out
            </Button>
          </Link>
          {/* <Link to="/dashboard" className={classes.linkStyle}>
            <Button color="primary"><h3>Dashboard</h3></Button>
          </Link>
          <Link to="/" className={classes.linkStyle}>
            <Button onClick={userLogout} color="primary"><h3>Log out</h3></Button>
          </Link> */}
        </Box>
      </Grid>  
  );

  if(jwtToken) {
    NavbarLinks = AuthNavbar
  } else {
    NavbarLinks = NotAuthNavbar
  }


  return(
    <Box display="flex" bgcolor="grey.200" alignItems="center">
      <Grid container className={classes.gridStyle} direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={8}>
          <Link className={classes.linkStyle} to="/">
            <Typography className={classes.typography}>Project Management Tool</Typography>
          </Link>
        </Grid>
        {NavbarLinks}
      </Grid>
    </Box>
  )
}