import React, { useEffect, useState } from "react";
import { Grid, withStyles, Typography, Button } from '@material-ui/core';
import ProjectItems from "../components/ProjectItems"
import { useDispatch, useSelector } from 'react-redux'
import { GET_PROJECTS } from '../actions/types'
import axios from 'axios'

const styles = theme => ({
    dashPadding: {
      // marginTop: theme.spacing(3),
      paddingBottom: "2em"
    },
    title: {
      fontSize: "5em",
      marginTop: "1em",
      [theme.breakpoints.down("sm")]:{
        fontSize: "3em"
      }
    },
    button: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
    }
})

function Landing(props){

  const {classes} = props

  return(
    <div>  
      <Grid container direction="row" justify="center" alignItems="center">
        <Typography className={classes.title}>
          Project Manager Tool
        </Typography>
        <Grid container justify="center">
          <Button style={{ margin: "1em"}} variant="contained" color="primary" href="/signup">Sign Up</Button>
          <Button style={{ margin: "1em"}} variant="contained" color="primary" href="/login">Login</Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Landing);