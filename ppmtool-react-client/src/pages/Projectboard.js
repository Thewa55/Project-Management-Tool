import React, { useState, useEffect} from 'react';
import { Grid, Typography, Button, Paper, Card, CardContent, CardActionArea, CardActions, CardMedia } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import TaskCard from '../components/TaskCard'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  boardStyling: {
    marginTop: theme.spacing(3)
  },
  title: {
    fontSize: "4em",
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
    width: "80%",
    paddingBottom: "2em"
  },
  header: {
    margin: "1em",
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
  const theme = useTheme();
  const [projectTasks, setProjectTasks] = useState({})

  let url = window.location.pathname;
  let id = url.substring(url.lastIndexOf("/") + 1)

  async function getTasks() {
    let id = getID()
    const res = await axios.get(`/api/backlog/${id}`)
    setProjectTasks(res.data)
  }

  function getID(){
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1) 
    return id
  }

  useEffect(() => {
    getTasks()
  }, [])

  return(
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.boardStyling}>
        <Typography className={classes.title}>
            {id} Project Board
        </Typography>
        <Grid container justify="center">
          <Button className={classes.buttonStyle} variant="contained" color="primary" href={`/createtask/${id}`}>Create Project Task</Button>
        </Grid>
        <Paper className={classes.outerPaper}>
          <Grid container direction="row" justify="center">
            <Grid item md={4}>
              <Grid container item direction="column" justify="flex-start" alignItems="center" md={12}>  
                <Paper className={classes.header} style={{backgroundColor: 'grey'}} elevation={3}>To Do</Paper>
                {projectTasks.length !== undefined ? (
                  <>
                    {projectTasks.map( projectTask  => 
                    projectTask.status === "To Do" ? 
                      (<TaskCard projectTask={projectTask} />)
                    :
                      (<> </>)
                    )}
                  </> ): (
                  <>
                  </>)}
              </Grid>
            </Grid>
            <Grid item md={4}>
            <Grid container item direction="column" justify="flex-start" alignItems="center" md={12}>
              <Paper className={classes.header} style={{backgroundColor: 'dodgerblue'}} elevation={3}>In Progress</Paper>
                {projectTasks.length !== undefined ? (
                  <>
                    {projectTasks.map( projectTask  => 
                    projectTask.status === "In Progress" ? 
                      (<TaskCard projectTask={projectTask} />)
                    :
                      (<> </>)
                    )}
                  </> ): (
                  <>
                  </>)}
            </Grid>
            </Grid>
            <Grid item md={4}>
            <Grid container item direction="column" justify="flex-start" alignItems="center" md={12}>
              <Paper className={classes.header} style={{backgroundColor: 'lightgreen'}} elevation={3}>Completed</Paper>
              {projectTasks.length !== undefined ? (
                  <>
                    {projectTasks.map( projectTask  => 
                    projectTask.status === "Completed" ? 
                      (<TaskCard projectTask={projectTask} />)
                    :
                      (<> </>)
                    )}
                  </> ): (
                  <>
                  </>)}
            </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}