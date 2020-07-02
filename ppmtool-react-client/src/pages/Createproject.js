import React, { useRef, useState, useEffect } from 'react'
import { Grid, TextField, Card, Container, Typography, Button, withStyles, CssBaseline, Avatar } from '@material-ui/core';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { GET_ERRORS } from '../actions/types'
import { useHistory } from 'react-router-dom'


const styles = theme => ({
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
})

const Createproject = (props) => {

  const { classes } = props;
  const jwtToken = localStorage.jwtToken;
  const dispatch = useDispatch()
  const history = useHistory()
  const projectName = useRef();
  const projectId = useRef();
  const projectDesc = useRef();
  const projectStart = useRef();
  const projectEnd = useRef();
  const [error, setError] = useState({
    description: "",
    projectName: "",
    projectIdentifier: ""
  })

  if(!jwtToken){
    history.push('/')
  }
  
  const handleSubmit = () =>{
    const newProject = {
      projectName: projectName.current.value,
      projectIdentifier: projectId.current.value,
      description: projectDesc.current.value,
      start_Date: projectStart.current.value,
      end_Date: projectEnd.current.value
    }
    createProject(newProject);
  }

  useEffect(() => {
    
  }, [error])

  async function createProject(project) {
    try {
      await axios.post("/api/project/", project)
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      history.push('/dashboard')
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      setError(err.response.data)
    }
  }

  console.log(error)

  return(
    <Container container component="main" maxWidth="sm">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1} >
          <Avatar className={classes.avatar}>
            <AssignmentOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Create Project</Typography>
          <form noValidate autoComplete="off" className={classes.formStyle}>
            <Grid container spacing={2}>
              <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField label="Project Name*" fullWidth placeholder="Project Name" margin="normal" autoFocus variant="outlined" inputRef={projectName} />
                <div className={classes.errorStyle}>{error.projectName}</div>
              </Grid>
              <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField fullWidth id="outlined-full-width" label="Project ID*  (Unique and can't be updated in the future)" placeholder="Project ID" margin="normal" variant="outlined" inputRef={projectId}/>
                <div className={classes.errorStyle}>{error.projectIdentifier}</div>
              </Grid>
              <Grid item xs={12} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField fullWidth multiline rows={2} rowsMax={4} id="outlined-full-width" label="Project Description" placeholder="Project Description" margin="normal" variant="outlined" inputRef={projectDesc} />
                <div className={classes.errorStyle}>{error.description}</div>
              </Grid>
              <Grid item xs={12} md={6} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField fullWidth id="outlined-full-width" label="Start Date" type="Date" placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectStart} />
              </Grid>
              <Grid item xs={12} md={6} style={{paddingTop: '0', paddingBottom: '0'}}>
                <TextField  fullWidth id="outlined-full-width" label="End Date" type="Date" placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectEnd} />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth style={{ marginBottom: "3em" }} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </Container>
  )
}

export default withStyles(styles)(Createproject);