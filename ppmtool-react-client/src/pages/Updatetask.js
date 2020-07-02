import React, { useState, useEffect, useRef } from 'react';
import { Grid, TextField, CssBaseline, Container, Typography, Button, Paper, Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';
import { GET_PROJECT_TASK, GET_ERRORS } from '../actions/types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  errorStyle:{
    color: "red",
    fontSize: "1em",
    textAlign: "left",
    marginLeft: "5%"
  }
}))

const status = [
  { value: 'To Do' },
  { value: 'In Progress' },
  { value: 'Completed' }
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
  const [singleTask, setSingleTask] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const taskSummary = useRef();
  const id = useRef();
  const taskCriteria = useRef();
  const dueDate = useRef();
  const [error, setError] = useState({});
  const [taskPriority, setTaskPriority] = useState();
  const [taskStatus, setTaskStatus] = useState();
  const [pageError, setPageError] = useState();
  const jwtToken = localStorage.jwtToken;

  if(!jwtToken){
    history.push('/')
  }

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

  async function updateTask(task, id) {
    let url = getRoute()
    try {
      await axios.patch(url, task)
      history.push(`/projectboard/${id}`)
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
    updateTask(updatedTask, projectId);
  }

  const getRoute = () =>{
    let url = window.location.pathname.split("/")
    let pt_id=url[url.length-1];
    let id = url[url.length-2];
    let route = `/api/backlog/${id}/${pt_id}`
    return route
  }

  useEffect(() => {
    getTask()
  }, [error])
  
  return(
    <div>
      { !pageError ? (
      <Container container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1} >
            <Avatar className={classes.avatar}> <UpdateOutlinedIcon /> </Avatar>
            <Typography component="h1" variant="h5"> Update Task</Typography>
            <form noValidate autoComplete="off" className={classes.formStyle}>
              <Grid container spacing={2}>
                <TextField style={{visibility: "hidden"}} inputRef={id} value={singleTask.id}></TextField>
                <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                  <TextField fullWidth label="Task Summary" placeholder="Task Summary" margin="normal" variant="outlined" inputRef={taskSummary} value={singleTask.summary} InputLabelProps={{ shrink: true }} onChange={e => setSingleTask({summary: e.target.value})}/>   
                  <div className={classes.errorStyle}>{error.summary}</div>
                </Grid>
                <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                  <TextField fullWidth multiline rows={2} rowsMax={4} id="outlined-full-width" label="Task Criteria" placeholder="Task Criteria" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={taskCriteria} value={singleTask.acceptanceCriteria} onChange={e => setSingleTask({acceptanceCriteria: e.target.value})}/>
                  <div className={classes.errorStyle}>{error.description}</div>
                </Grid>
                <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                  <TextField fullWidth className={classes.textFieldStyle} id="outlined-full-width" label="Due Date" type="Date" placeholder="Due Date" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={dueDate}  value={singleTask.dueDate} onChange={e => setSingleTask({dueDate: e.target.value})}/>
                </Grid>
                <Grid item xs={12} md={6} style={{paddingTop: '0'}}>
                  <TextField fullWidth select label="Priority" className={classes.textDateFieldStyle} style={{ margin: 15}} SelectProps={{ native: true }} value={taskPriority} InputLabelProps={{ shrink: true }} helperText="Please select task priority" onChange={e => setTaskPriority(e.target.value)} >
                    {priority.map((option, index) => ( <option key={index} value={option.value}> {option.label} </option> ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6} style={{paddingTop: '0'}}>
                  <TextField fullWidth select label="Status" className={classes.textDateFieldStyle} SelectProps={{ native: true }} style={{ margin: 15}} value={taskStatus} InputLabelProps={{ shrink: true }} helperText="Please select task status" onChange={e => setTaskStatus(e.target.value)}>
                    {status.map((option, index) => ( <option key={index} value={option.value}> {option.value} </option> ))}
                  </TextField>
                </Grid>
                <Button fullWidth style={{marginBottom: "3em"}} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
              </Grid>
            </form>
          </Grid>        
        </div>
      </Container>) : (
      <Paper style={{textAlign: "center", padding: "1em", margin: "1em"}}>
        <h1>{pageError.projectIdentifier}</h1>
      </Paper>
    )}
    </div>
  )
}