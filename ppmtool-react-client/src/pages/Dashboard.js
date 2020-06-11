import React, { useEffect, useState } from "react";
import { Grid, withStyles, Typography, Button } from '@material-ui/core';
import ProjectItems from "../components/ProjectItems"
import { useDispatch, useSelector } from 'react-redux'
import { GET_PROJECTS } from '../actions/types'
import axios from 'axios'

const styles = theme => ({
    dashPadding: {
      marginTop: theme.spacing(3)
    },
    title: {
      fontSize: "5em",
      [theme.breakpoints.down("sm")]:{
        fontSize: "3em"
      }
    } 
})

function Dashboard(props){

  const dispatch = useDispatch()
  const [allProjects, setProjects] = useState([])

  const projects = useSelector(state => ({
    projects: state.projects
  }))

  async function getProjects() {
    const res = await axios.get("http://localhost:8080/api/project/all/")
    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    })
    setProjects(res.data)
  }

  useEffect(()=>{
    getProjects()
  }, [])

  console.log(allProjects)

  const {classes} = props

  return(
    <div>  
      <Grid container direction="row" justify="center" alignItems="center" className={classes.dashPadding}>
        <Typography className={classes.title}>
          Projects
        </Typography>
        <Grid container justify="center">
          <Button variant="contained" color="primary" href="/createproject">Create Project</Button>
        </Grid>
      </Grid>

      <hr style={{width: "80%"}}/>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.dashPadding}>
        {allProjects.map(project => (<ProjectItems key={project.id} project={project} />))}
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Dashboard);