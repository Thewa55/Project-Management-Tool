import React, { useState, useEffect, useRef } from 'react';
import { Grid, TextField, Typography, Button, Container, CssBaseline, Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { GET_PROJECT, GET_ERRORS } from '../actions/types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import UpdateOutlinedIcon from '@material-ui/icons/UpdateOutlined';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formStyle:{
    width: '100%',
    marginTop: theme.spacing(1),
  },
  errorStyle:{
    color: "red",
    fontSize: "1em",
    textAlign: "left",
    paddingTop: '0',
    paddingBotttom: '0'
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
}))

export default function UpdateProject(){
  
  const classes = useStyles();
  const [singleProject, setSingleProject] = useState({})
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useRef()
  const projectName = useRef();
  const projectId = useRef();
  const projectDesc = useRef();
  const projectStart = useRef();
  const projectEnd = useRef();
  const [error, setError] = useState({})
  const jwtToken = localStorage.jwtToken;

  if(!jwtToken){
    history.push('/')
  }

  async function updateProject(project) {
    try {
      await axios.post("/api/project/", project)
      history.push('/dashboard')
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

  async function getProject() {
    let url = window.location.pathname;
    let id = url.substring(url.lastIndexOf("/") + 1)
    try{
    const res = await axios.get(`/api/project/${id}/`)
    dispatch({
      type: GET_PROJECT,
      payload: res.data
    })
    setSingleProject(res.data)
    } catch(err){
      history.push('/')
    }
  }

  const handleSubmit = () =>{
    const newProject = {
      id: id.current.value,
      projectName: projectName.current.value,
      projectIdentifier: projectId.current.value,
      description: projectDesc.current.value,
      start_Date: projectStart.current.value,
      end_Date: projectEnd.current.value
    }
    updateProject(newProject);
  }

  useEffect(() => {
    getProject()
  }, [error])
  
  return(
    <Container container component="main" maxWidth="sm" className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <UpdateOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5"> Update Project</Typography>
        <form noValidate autoComplete="off" className={classes.formStyle}>
          <Grid container spacing={2}>
              <TextField style={{visibility: "hidden"}} inputRef={id} value={singleProject.id}></TextField>
              <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField autoFocus label="Project Name" fullWidth placeholder="Project Name" value={singleProject.projectName } margin="normal" variant="outlined" inputRef={projectName} InputLabelProps={{ shrink: true }} onChange={e => setSingleProject({projectName: e.target.value})}/>               
                <div className={classes.errorStyle}>{error.projectName}</div>
              </Grid>
              <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField fullWidth id="outlined-full-width" label="Project ID" placeholder="Project ID" margin="normal" variant="outlined" inputRef={projectId} InputLabelProps={{ shrink: true }} disabled value={singleProject.projectIdentifier} />
              </Grid>
              <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField fullWidth multiline rows={2} rowsMax={4} id="outlined-full-width" label="Project Description" placeholder="Project Description" margin="normal" variant="outlined" inputRef={projectDesc} InputLabelProps={{ shrink: true }} value={singleProject.description} onChange={e => setSingleProject({description: e.target.value})}/>
                <div className={classes.errorStyle}>{error.description}</div>
              </Grid>
              <Grid item xs={12} md={6} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField fullWidth id="outlined-full-width" label="Start Date" type="Date" placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectStart} value={singleProject.start_Date} onChange={e => setSingleProject({start_Date: e.target.value})} />
              </Grid>
              <Grid item xs={12} md={6} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField fullWidth id="outlined-full-width" label="End Date" type="Date" placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectEnd} value={singleProject.end_Date} onChange={e => setSingleProject({end_Date: e.target.value})}/>
              </Grid>
              <Grid item xs={12}>
              <Button fullWidth style={{ marginBottom: "3em" }} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </Grid>
          </Grid>
        </form>
      </div>
  </Container>
  )
}