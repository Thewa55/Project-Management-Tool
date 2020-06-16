import React, { useState, useEffect, useRef } from 'react';
import { Grid, TextField, Card, Typography, Button, withStyles, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PROJECT_TASK, GET_ERRORS } from '../actions/types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    cardStyle:{
      width: "80%",
      marginTop: theme.spacing(6)
    },
    textFieldStyle:{
      width: "90%",
    },
    textDateFieldStyle:{
        width: "44%",
        [theme.breakpoints.down("sm")]:{
            width: '90%'
        }
    },
    formStyle:{
      alignItems: "center",
      textAlign: "center"
    },
    typographyStyle:{
      textAlign: "center"
    },
    buttonStyle:{
      width: "90%",
      padding: "1em"
    },
    errorStyle:{
      color: "red",
      fontSize: "1em",
      textAlign: "left",
      marginLeft: "5%"
    }
}))

const status = [
  {
    value: 'To Do',
    label: 'To Do',
  },
  {
    value: 'In Progress',
    label: 'In Progress',
  },
  {
    value: 'Completed',
    label: 'Completed',
  }
];
  
const priority = [
  {
    value: 1,
    label: 'High',
  },
  {
    value: 2,
    label: 'Medium',
  },
  {
    value: 3,
    label: 'Low',
  }
];

export default function UpdateTask(){
  
  const classes = useStyles();
  const theme = useTheme();
  const [singleTask, setSingleTask] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()
  const taskSummary = useRef();
  const id = useRef();
  const taskCriteria = useRef();
  const dueDate = useRef();
  const [error, setError] = useState({})
  const [taskPriority, setTaskPriority] = useState()
  const [taskStatus, setTaskStatus] = useState()
  const [pageError, setPageError] = useState()

  async function getTask() {
    let url = getRoute();
    try{
      const res = await axios.get(url)
      dispatch({
        type: GET_PROJECT_TASK,
        payload: res.data
      })
      setTaskPriority(res.data.priority)
      setTaskStatus(res.data.status)
      setSingleTask(res.data)
    } catch(err){
      setPageError(err.response.data)
    }
  }

  async function updateTask(task) {
    let url = getRoute()
    try {
      await axios.patch(url, task)
      history.push('/')
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      setError(err.response.data)
    }
  }

  const handleSubmit = () =>{
    let url = window.location.pathname.split("/")
    let projectSequence = url[url.length-1];
    let projectId = url[url.length-2];
    const updatedTask = {
        id: id.current.value,
        projectSequence: projectSequence,
        projectIdentifier: projectId,
        summary: taskSummary.current.value,
        acceptanceCriteria: taskCriteria.current.value,
        dueDate: dueDate.current.value,
        status: taskStatus,
        priority: taskPriority
    }
    updateTask(updatedTask);
  }

  const getRoute = () =>{
    let url = window.location.pathname.split("/")
    let pt_id=url[url.length-1];
    let id = url[url.length-2];
    let route = `/api/backlog/${id}/${pt_id}`
    return route
  }

  const handleChange = (event) => {
    setTaskPriority(event.target.value);
  };

  const handleStatus =(event) =>{
    setTaskStatus(event.target.value)
  }

  useEffect(() => {
    getTask()
  }, [error])
  
  return(
    <div>
      { !pageError ? (
    <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1}>
      <Card className={classes.cardStyle}>
        <Typography variant="h2" className={classes.typographyStyle}>Update Project</Typography>
        <form noValidate autoComplete="off" className={classes.formStyle}>
          <TextField style={{visibility: "hidden"}} inputRef={id} value={singleTask.id}></TextField>
          <TextField className={classes.textFieldStyle} label="Task Summary" style={{ margin: 10 }} placeholder="Task Summary" margin="normal" variant="outlined" inputRef={taskSummary} value={singleTask.summary} InputLabelProps={{ shrink: true }} onChange={e => setSingleTask({summary: e.target.value})}/>   
        
          <div className={classes.errorStyle}>{error.summary}</div>

          <TextField className={classes.textFieldStyle} multiline rows={2} rowsMax={4} id="outlined-full-width" label="Task Criteria" style={{ margin: 10 }} placeholder="Task Criteria" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={taskCriteria} value={singleTask.acceptanceCriteria} onChange={e => setSingleTask({acceptanceCriteria: e.target.value})}/>

          <div className={classes.errorStyle}>{error.description}</div>

          <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Due Date" type="Date" style={{ margin: 15 }} placeholder="Due Date" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={dueDate}  value={singleTask.dueDate} onChange={e => setSingleTask({dueDate: e.target.value})}/>

          <TextField select label="Priority" className={classes.textDateFieldStyle} onChange={handleChange} style={{ margin: 15}} SelectProps={{ native: true }} value={singleTask.priority} InputLabelProps={{ shrink: true }} helperText="Please select task priority"> onChange={e => setTaskPriority(e.target.value)} >
            {priority.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <TextField select label="Status" className={classes.textDateFieldStyle} onChange={handleStatus} SelectProps={{ native: true }} style={{ margin: 15}} value={singleTask.status} InputLabelProps={{ shrink: true }} helperText="Please select task status" onChange={e => setTaskStatus(e.target.value)}>
            {status.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
          <Button className={classes.buttonStyle} style={{ margin: 15, marginBottom: "3em"}} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </form>
      </Card>
    </Grid>) : (
      <Paper style={{textAlign: "center", padding: "1em", margin: "1em"}}>
        <h1>{pageError.projectIdentifier}</h1>
      </Paper>
    )}
    </div>
  )
}