import React, { useState, useEffect} from 'react';
import { Grid, Typography, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import TaskCard from '../components/TaskCard'
import { useDispatch } from 'react-redux'
import { GET_ERRORS } from '../actions/types'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  boardStyling: {
    marginTop: theme.spacing(3)
  },
  title: {
    fontSize: "3em",
    [theme.breakpoints.down("sm")]:{
      fontSize: "2em",
      textAlign: "center"
    }
  },
  outerPaper:{
    width: "90%",
    paddingBottom: "2em",
    marginTop: "1em"
  },
  paper:{
    margin: "1em",
    width: "90%",
    paddingBottom: "2em"
  },
  header: {
    width: "85%",
    marginTop: "1em",
    fontSize: "2em",
    padding: ".5em",
    textAlign: "center",
    color: "white",
    [theme.breakpoints.down("sm")]:{
        fontSize: "1.5em",
        padding: ".5em"
    }
  },
  buttonStyle: {
    padding: "1em",
    [theme.breakpoints.down("sm")]:{
      marginTop: ".5em",
      padding: ".5em"
    }
  }
}));


export default function Projectboard() {

  const classes = useStyles();
  const [projectTasks, setProjectTasks] = useState({});
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const jwtToken = localStorage.jwtToken;
  const history = useHistory();

  let url = window.location.pathname;
  let id = url.substring(url.lastIndexOf("/") + 1)

  if(!jwtToken){
    history.push('/');
  }

  async function getTasks() {
    try{
      let id = getID()
      const res = await axios.get(`/api/backlog/${id}`)
      setProjectTasks(res.data)
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    } catch(err){
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      setError(err.response.data)
    }
  }
  
  function getID(){
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1) 
    return id
  }

  useEffect(() => {
    getTasks()
  }, [projectTasks])

  return(
    <div className={classes.root}>
      { !error ? (
      <Grid container direction="row" justify="center" alignItems="center" className={classes.boardStyling}>
        <Typography className={classes.title}>
            {id} Project Board
        </Typography>
        <Grid container justify="center">
          <Button className={classes.buttonStyle} variant="contained" color="primary" href={`/createtask/${id}`}>Create Project Task</Button>
        </Grid>
        <Paper className={classes.outerPaper}>
          <Grid container direction="row" justify="center">
              <Grid container item direction="column" justify="flex-start" alignItems="center" lg ={4} md={12}>  
                <Paper className={classes.header} style={{color: 'Green'}} >To Do</Paper>
                {projectTasks.length !== undefined ? (
                  <>
                    {projectTasks.map( (projectTask, index)  => 
                    projectTask.status === "To Do" ? 
                      (<TaskCard key={index} projectId={id} projectTask={projectTask} />)
                    :
                      (<> </>)
                    )}
                  </> ): (
                  <>
                  </>)}
              </Grid>
            <Grid container item direction="column" justify="flex-start" alignItems="center" lg={4} md={12}>
              <Paper className={classes.header} style={{color: '#e1ad01'}} >In Progress</Paper>
                {projectTasks.length !== undefined ? (
                  <>
                    {projectTasks.map( (projectTask, index)  => 
                    projectTask.status === "In Progress" ? 
                      (<TaskCard key={index} projectId={id} projectTask={projectTask} />)
                    :
                      (<> </>)
                    )}
                  </> ): (
                  <>
                  </>)}
            </Grid>
            <Grid container item direction="column" justify="flex-start" alignItems="center" lg={4} md={12}>
              <Paper className={classes.header} style={{color: '#ff2400'}} >Completed</Paper>
              {projectTasks.length !== undefined ? (
                  <>
                    {projectTasks.map( (projectTask, index)  => 
                    projectTask.status === "Completed" ? 
                      (<TaskCard key={index} projectId={id} projectTask={projectTask} />)
                    :
                      (<> </>)
                    )}
                  </> ): (
                  <>
                  </>)}
            </Grid>
          </Grid>
        </Paper>
      </Grid>) : (
        <Paper style={{textAlign: "center", padding: "1em", margin: "1em"}}>
         <h1>{error.projectIdentifier}</h1>
        </Paper>
      )}
    </div>
  )
}