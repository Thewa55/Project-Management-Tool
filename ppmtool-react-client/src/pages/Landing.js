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
      [theme.breakpoints.down("sm")]:{
        fontSize: "3em"
      }
    } 
})

function Landing(props){

  const dispatch = useDispatch()

//   useEffect(()=>{
//     getProjects()
//   }, [allProjects])

  const {classes} = props

  return(
    <div>  
      <Grid container direction="row" justify="center" alignItems="center">
        <Typography className={classes.title}>
          Personal Project Manager
        </Typography>
        <Grid container justify="center">
          <Button variant="contained" color="primary" href="/signup">Sign Up</Button>
          <Button variant="contained" color="primary" href="/login">Login</Button>
        </Grid>
      </Grid>

      <hr style={{width: "80%"}}/>
    </div>
  )
}

export default withStyles(styles)(Landing);