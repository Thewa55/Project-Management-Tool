import React, { useState, useEffect, useRef } from 'react';
import { Grid, TextField, Card, Typography, Button, withStyles } from '@material-ui/core';
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

export default function UpdateTask(){
  
  const classes = useStyles();
  const theme = useTheme();
  const [singleTask, setSingleTask] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useRef()
  const projectName = useRef();
  const projectId = useRef();
  const projectDesc = useRef();
  const projectStart = useRef();
  const projectEnd = useRef();
  const [error, setError] = useState({})

//   const project = useSelector(state => ({
//     project: state.projects
//   }))

  async function getTask() {
    let url = window.location.pathname.split("/")
    let pt_id=url[url.length-1];
    let id = url[url.length-2];
    try{
    const res = await axios.get(`/api/backlog/${id}/${pt_id}`)
    dispatch({
      type: GET_PROJECT_TASK,
      payload: res.data
    })
    setSingleTask(res.data)
    } catch(err){
      history.push('/')
    }
  }

//   async function updateProject(project) {
//     try {
//       await axios.post("/api/project/", project)
//       history.push('/')
//       dispatch({
//         type: GET_ERRORS,
//         payload: {}
//       })
//     } catch (err) {
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//       setError(err.response.data)
//     }
//   }

  const handleSubmit = () =>{
    // const newProject = {
    //   id: id.current.value,
    //   projectName: projectName.current.value,
    //   projectIdentifier: projectId.current.value,
    //   description: projectDesc.current.value,
    //   start_Date: projectStart.current.value,
    //   end_Date: projectEnd.current.value
    // }
    // console.log(newProject)
    // updateProject(newProject);
  }

  useEffect(() => {
    getTask()
  }, [error])

  console.log(singleTask)
  
  return(
    <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1}>
    <Card className={classes.cardStyle}>
      <Typography variant="h2" className={classes.typographyStyle}>Update Project</Typography>
      <form noValidate autoComplete="off" className={classes.formStyle}>
        {/* <TextField style={{visibility: "hidden"}} inputRef={id} value={singleProject.id}></TextField>
        <TextField className={classes.textFieldStyle} label="Project Name" style={{ margin: 10 }} placeholder="Project Name" value={singleProject.projectName } margin="normal" variant="outlined" inputRef={projectName} InputLabelProps={{ shrink: true }} onChange={e => setSingleProject({projectName: e.target.value})}/>   
        
        <div className={classes.errorStyle}>{error.projectName}</div>

        <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Project ID" style={{ margin: 10 }} placeholder="Project ID" margin="normal" variant="outlined" inputRef={projectId} InputLabelProps={{ shrink: true }} disabled value={singleProject.projectIdentifier} />
        
        <TextField className={classes.textFieldStyle} placeholder="MultiLine with rows: 2 and rowsMax: 4" multiline rows={2} rowsMax={4} id="outlined-full-width" label="Project Description" style={{ margin: 10 }} placeholder="Project Description" margin="normal" variant="outlined" inputRef={projectDesc} InputLabelProps={{ shrink: true }} value={singleProject.description} onChange={e => setSingleProject({description: e.target.value})}/>

        <div className={classes.errorStyle}>{error.description}</div>

        <TextField className={classes.textDateFieldStyle} id="outlined-full-width" label="Start Date" type="Date" style={{ margin: 15 }} placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectStart} value={singleProject.start_Date} onChange={e => setSingleProject({start_Date: e.target.value})} />

        <TextField className={classes.textDateFieldStyle} id="outlined-full-width" label="End Date" type="Date" style={{ margin: 15}} placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectEnd} value={singleProject.end_Date} onChange={e => setSingleProject({end_Date: e.target.value})}/> */}

        <Button className={classes.buttonStyle} style={{ margin: 15, marginBottom: "3em"}} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </form>
    </Card>
  </Grid>
  )
}