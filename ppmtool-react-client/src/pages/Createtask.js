import React, { useState, useRef } from 'react';
import { Grid, TextField, Card, Typography, Button } from '@material-ui/core';
import { useDispatch} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import { GET_ERRORS} from '../actions/types'
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    cardStyle:{
      width: "80%",
      marginTop: theme.spacing(6),
      paddingBottom: "3em"
    },
    textFieldStyle:{
      width: "90%",
    },
    textDateFieldStyle:{
        width: "44%",
        [theme.breakpoints.down("sm")]:{
            width: '90%',
            marginTop: '.7em'
        }
    },
    formStyle:{
      alignItems: "center",
      textAlign: "center"
    },
    typographyStyle:{
      textAlign: "center",
      [theme.breakpoints.down("sm")]:{
        fontSize: "2em",
        marginTop: ".5em"
    }
    },
    buttonStyle:{
      padding: "1em",
      width: "44%",
      [theme.breakpoints.down("sm")]:{
          width: '90%',
          marginTop: '.7em'
      }
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
    label: 'Select Status',
  },
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
    <Grid container direction="column" justify="flex-start" alignItems="center" spacing={3}>
    <Card className={classes.cardStyle}>
      <Typography variant="h2" className={classes.typographyStyle}>Create Project Task</Typography>
      <form noValidate autoComplete="off" className={classes.formStyle}>
        <TextField className={classes.textFieldStyle} label="Task Summary" style={{ margin: 10 }} placeholder="Task Summary" margin="normal" variant="outlined" inputRef={taskSummary} />   
        
        <div className={classes.errorStyle}>{error.projectName}</div>

        <TextField className={classes.textFieldStyle} multiline rows={2} rowsMax={4} id="outlined-full-width" label="Task Criteria" style={{ margin: 10 }} placeholder="Task Criteria" margin="normal" variant="outlined" inputRef={taskCriteria}/>

        <div className={classes.errorStyle}>{error.description}</div>

        <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Due Date" type="Date" style={{ margin: 15 }} placeholder="Due Date" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={dueDate} />

        <TextField select label="Priority" className={classes.textDateFieldStyle} onChange={handleChange} style={{ margin: 15}} SelectProps={{ native: true }} InputLabelProps={{ shrink: true }} helperText="Please select task priority">
          {priority.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField select label="Status" className={classes.textDateFieldStyle} onChange={handleStatus} SelectProps={{ native: true }} style={{ margin: 15}} InputLabelProps={{ shrink: true }} helperText="Please select task status">
          {status.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button className={classes.buttonStyle} style={{ margin: 15, }} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        <Button className={classes.buttonStyle} style={{ margin: 15, }} variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
      </form>
    </Card>
  </Grid>
  )
}