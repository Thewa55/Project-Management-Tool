import React, { useEffect, useState } from "react";
import { Grid, withStyles, Typography, Button, Container } from '@material-ui/core';
import ProjectItems from "../components/ProjectItems"
import { useDispatch } from 'react-redux'
import { GET_PROJECTS } from '../actions/types'
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const styles = theme => ({
    dashPadding: {
      paddingBottom: "2em"
    },
    title: {
      fontSize: "2em",
      marginRight: '1em'
    } 
})

function Dashboard(props){

  const dispatch = useDispatch();
  const [allProjects, setProjects] = useState([]);
  const jwtToken = localStorage.jwtToken;
  const history = useHistory();

  if(!jwtToken){
    history.push('/');
  }

  async function getProjects() {
    const res = await axios.get("/api/project/all/")
    dispatch({
      type: GET_PROJECTS,
      payload: res.data
    })
    setProjects(res.data)
  }

  useEffect(()=>{
    getProjects()
  }, [allProjects])

  const {classes} = props

  return(
    <div>
      <Container fixed>  
        <Grid container direction="row" justify="center" alignItems="center">
          <Typography className={classes.title}>
            Project Board
          </Typography>
          <Button variant="contained" color="primary" href="/createproject">Create Project</Button>
        </Grid>
        <hr style={{width: "80%"}}/>
        <Grid container direction="row" justify="center" alignItems="center" className={classes.dashPadding}>
          {allProjects.map(project => (<ProjectItems key={project.id} project={project} />))}
        </Grid>
      </Container>
    </div>
  )
}

export default withStyles(styles)(Dashboard);