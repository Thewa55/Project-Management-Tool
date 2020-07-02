import React, { useState, useRef } from 'react';
import { Grid, TextField, Typography, Button, Container, CssBaseline, Avatar } from '@material-ui/core';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import { useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import { GET_ERRORS} from '../actions/types'
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
    backgroundColor: theme.palette.secondary.main,
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
      value: 3,
      label: 'Select Priority',
    },
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

export default function Createtask(){
  
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const taskSummary = useRef();
  const taskCriteria = useRef();
  const dueDate = useRef();
  const [taskPriority, setTaskPriority] = useState(3)
  const [taskStatus, setTaskStatus] = useState("To Do")
  const [error, setError] = useState({});
  const jwtToken = localStorage.jwtToken;

  if(!jwtToken){
    history.push('/');
  }

  async function createTask(projecttask) {
    let id = getID()
    try {
      await axios.post(`/api/backlog/${id}`, projecttask)
      history.push(`/projectboard/${id}`)
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      setError(err.response.data)
    }
  }

  const handleSubmit = () =>{
    const newTask = {
      summary: taskSummary.current.value,
      acceptanceCriteria: taskCriteria.current.value,
      dueDate: dueDate.current.value,
      status: taskStatus,
      priority: taskPriority
    }
    createTask(newTask)
  }

  const handleChange = (event) => {
    setTaskPriority(event.target.value);
  };

  const handleStatus =(event) =>{
    setTaskStatus(event.target.value)
  }

  const getID = () => {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1);
    return id;
  }

  const handleCancel =(event) =>{
    let id = getID();
    history.push(`/projectboard/${id}`);
  }
  
  return(
    <Container container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1} >
          <Avatar className={classes.avatar}>
            <AssignmentOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Create Task</Typography>
          <form noValidate autoComplete="off" className={classes.formStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField fullWidth label="Task Summary*" placeholder="Task Summary" margin="normal" variant="outlined" inputRef={taskSummary} />   
                <div className={classes.errorStyle}>{error.projectName}</div>
              </Grid>
              <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField fullWidth multiline rows={2} rowsMax={4} id="outlined-full-width" label="Task Criteria*"placeholder="Task Criteria" margin="normal" variant="outlined" inputRef={taskCriteria}/>
                <div className={classes.errorStyle}>{error.description}</div>
              </Grid>
              <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField fullWidth id="outlined-full-width" label="Due Date" type="Date" placeholder="Due Date" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={dueDate} />
              </Grid>
              <Grid item xs={12} md={6} style={{paddingTop: '0'}}>
                <TextField select label="Priority" fullWidth onChange={handleChange} SelectProps={{ native: true }} InputLabelProps={{ shrink: true }} helperText="Please select task priority">
                  {priority.map((option, index) => ( <option key={index} value={option.value}> {option.label} </option> ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6} style={{paddingTop: '0'}}>
                <TextField select label="Status" fullWidth onChange={handleStatus} SelectProps={{ native: true }} InputLabelProps={{ shrink: true }} helperText="Please select task status">
                  {status.map((option, index) => ( <option key={index} value={option.value}> {option.value} </option> ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth style={{marginBottom: '3em'}} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
              </Grid>
              <Grid item xs={6}>
                <Button fullWidth style={{marginBottom: '3em'}} variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </Container>
  )
}