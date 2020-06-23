// import React from "react";
// import { Grid, withStyles, Typography, Button } from '@material-ui/core';

// const styles = theme => ({
//     dashPadding: {
//       paddingBottom: "2em"
//     },
//     title: {
//       fontSize: "5em",
//       marginTop: "1em",
//       [theme.breakpoints.down("sm")]:{
//         fontSize: "3em"
//       }
//     },
//     button: {
//       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
//     }
// })

// function Landing(props){

//   const {classes} = props

//   return(
//     <div>  
//       <Grid container direction="row" justify="center" alignItems="center">
//         <Typography className={classes.title}>
//           Project Manager Tool
//         </Typography>
//         <Grid container justify="center">
//           <Button style={{ margin: "1em"}} variant="contained" color="primary" href="/signup">Sign Up</Button>
//           <Button style={{ margin: "1em"}} variant="contained" color="primary" href="/login">Login</Button>
//         </Grid>
//       </Grid>
//     </div>
//   )
// }

// export default withStyles(styles)(Landing);

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Image from '../assets/images/ProjectManagement.jpg'

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

  return (
    <Paper className={classes.mainFeaturedPost}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              Welcome to Personal Project Management Tool
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              Where you can easily create and maintain your project goals from start to finish
            </Typography>
            <Link variant="subtitle1" href="/signup">
              Click here to sign up
            </Link>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}
