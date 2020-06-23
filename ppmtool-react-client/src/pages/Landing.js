import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Image from '../assets/images/ProjectManagement.jpg'
import { useDispatch } from 'react-redux';
import { logout } from '../utils/logout'

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${Image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));

export default function Landing() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const jwtToken = localStorage.jwtToken;
  let Landingpage;

  const userLogout = () => {
    dispatch(logout());
    // window.location.href="/";
  }

  const NotAuthLanding = (
    <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Welcome to <br/>Project Management Tool
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Where you can easily create and maintain your project goals from start to finish
            </Typography>
            <Link variant="subtitle1" style={{ color: "white"}} href="/signup">
              Don't have an account? Click here to sign up
            </Link>
            <br/>
            <Link variant="subtitle1" style={{ color: "white"}} href="/login">
              Existing user? Log in here
            </Link>
          </div>
        </Grid>
      </Grid>
  )

  const AuthLanding = (
    <Grid container>
      <Grid item md={6}>
        <div className={classes.mainFeaturedPostContent}>
          <Typography component="h1" variant="h3" color="inherit" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            
          </Typography>
          <Link variant="subtitle1" style={{ color: "white"}} href="/dashboard">
            Go back to your dashboard
          </Link>
          <br/>
          <Link variant="subtitle1" onClick={userLogout} style={{ color: "white"}} href="/">
            You are currently logged in, would you like to log out?
          </Link>
        </div>
      </Grid>
    </Grid>
  )

  if(jwtToken){
    Landingpage = AuthLanding
  } else {
    Landingpage = NotAuthLanding
  }


  return (
    <Paper className={classes.mainFeaturedPost}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} />}
      <div className={classes.overlay} />
      {Landingpage}
    </Paper>
  );
}
