import React, { useRef, useState, useEffect } from 'react'
import { Grid, TextField, Card, Container, Typography, Button, withStyles, CssBaseline } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { GET_ERRORS } from '../actions/types'
import { useHistory } from 'react-router-dom'


const styles = theme => ({
    formStyle:{
      alignItems: "center",
      textAlign: "center"
    },
    typographyStyle:{
      textAlign: "center"
    },
    errorStyle:{
      color: "red",
      fontSize: "1em",
      textAlign: "left",
      paddingTop: '0',
      paddingBotttom: '0'
    }
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
    <Container maxWidth="sm">
      <CssBaseline />
      <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1} >
          <Typography variant="h2" className={classes.typographyStyle}>Create Project</Typography>
          <form noValidate autoComplete="off" className={classes.formStyle}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField label="Project Name" fullWidth placeholder="Project Name" margin="normal" variant="outlined" inputRef={projectName} />
            </Grid>
            {error.projectName === "" ? (<> 
            </>):
            (<Grid item xs={12}>
              <div className={classes.errorStyle}>{error.projectName}</div>
            </Grid>)
            }
            <Grid item xs={12}>
              <TextField fullWidth id="outlined-full-width" label="Project ID" placeholder="Project ID" margin="normal" variant="outlined" inputRef={projectId}/>
            </Grid>
            {error.projectIdentifier === "" ? (
              <> </>
              ) : (
              <Grid item xs={12}>
                <div className={classes.errorStyle}>{error.projectIdentifier}</div>
              </Grid>)
            }
            <Grid item xs={12}>
              <TextField fullWidth multiline rows={2} rowsMax={4} id="outlined-full-width" label="Project Description" placeholder="Project Description" margin="normal" variant="outlined" inputRef={projectDesc} />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.errorStyle}>{error.description}</div>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth id="outlined-full-width" label="Start Date" type="Date" placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectStart} />
            </Grid>
            <Grid item xs={6}>
              <TextField  fullWidth id="outlined-full-width" label="End Date" type="Date" placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectEnd} />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth style={{ marginBottom: "3em" }} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
            </Grid>
          </Grid>
          </form>
      </Grid>
    </Container>
  )
}

export default withStyles(styles)(Createproject);