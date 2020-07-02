import React, { useState, useEffect} from 'react';
import { Grid, Typography, Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { GET_ERRORS } from '../actions/types'
import { useHistory } from 'react-router-dom'
import ExpansionPanel from '../components/ExpansionPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    fontSize: "2em",
    [theme.breakpoints.down("sm")]:{
      fontSize: "2em",
      textAlign: "center"
    }
  },
  outerPaper:{
    width: "90%",
    paddingBottom: "2em",
  },
  paper:{
    margin: "1em",
    width: "90%",
    paddingBottom: "2em"
  },
  header: {
    width: "85%",
    fontSize: "2em",
    padding: ".5em",
    textAlign: "center",
    [theme.breakpoints.down("sm")]:{
        fontSize: "1.5em",
        padding: ".5em"
    }
  },
  buttonStyle: {
    marginLeft: "2em",
    [theme.breakpoints.down("sm")]:{
      marginTop: ".5em",
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
      <Grid container direction="row" justify="center" alignItems="center">
          <Typography className={classes.title}>
            {id}'s Task Board
          </Typography>
          <Button className={classes.buttonStyle} variant="contained" color="primary" href={`/createtask/${id}`}>Create Project Task</Button>
        <hr style={{width: "90%"}}/>
        <Paper className={classes.outerPaper}>
          <Grid container direction="row" justify="center">
              <Grid container item direction="column" justify="flex-start" alignItems="center" lg ={4} md={12}>  
                <Paper className={classes.header} >To Do</Paper>
                {projectTasks.length !== undefined ? (
                  <>
                    {projectTasks.map( (projectTask, index)  => 
                    projectTask.status === "To Do" ? 
                      (<ExpansionPanel key={index} projectId= {id} projectTask={projectTask} />)
                      // (<TaskCard key={index} projectId={id} projectTask={projectTask} />)
                    :
                      (<> </>)
                    )}
                  </> ): (
                  <>
                  </>)}
              </Grid>
            <Grid container item direction="column" justify="flex-start" alignItems="center" lg={4} md={12}>
              <Paper className={classes.header}>In Progress</Paper>
                {projectTasks.length !== undefined ? (
                  <>
                    {projectTasks.map( (projectTask, index)  => 
                    projectTask.status === "In Progress" ? 
                      (<ExpansionPanel key={index} projectId= {id} projectTask={projectTask} />)
                    :
                      (<> </>)
                    )}
                  </> ): (
                  <>
                  </>)}
            </Grid>
            <Grid container item direction="column" justify="flex-start" alignItems="center" lg={4} md={12}>
              <Paper className={classes.header}>Completed</Paper>
              {projectTasks.length !== undefined ? (
                  <>
                    {projectTasks.map( (projectTask, index)  => 
                    projectTask.status === "Completed" ? 
                      (<ExpansionPanel key={index} projectId= {id} projectTask={projectTask} />)
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