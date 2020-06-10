import React, { useRef, useState } from 'react'
import { Grid, TextField, Card, Typography, Button, withStyles } from '@material-ui/core';

const styles = theme => ({
    cardStyle:{
      width: "80%",
      marginTop: theme.spacing(6)
    },
    textFieldStyle:{
      width: "90%",
    },
    textDateFieldStyle:{
        width: "45%",
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
    }
})

const Createproject = (props) => {

  const {classes, theme } = props;

  const projectName = useRef();
  const projectId = useRef();
  const projectDesc = useRef();
  const projectStart = useRef();
  const projectEnd = useRef();

  const handleSubmit = () =>{
    const project = {
      projectName: projectName.current.value,
      projectIdentifier: projectId.current.value,
      description: projectDesc.current.value,
      start_date: projectStart.current.value,
      end_date: projectEnd.current.value
    }
    console.log(project)
  }

  return(
    <>
      <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1}>
        <Card className={classes.cardStyle}>
          <Typography variant="h2" className={classes.typographyStyle}>Create Project</Typography>
          <form noValidate autoComplete="off" className={classes.formStyle}>
            <TextField className={classes.textFieldStyle} label="Project Name" style={{ margin: 10 }} placeholder="Project Name" margin="normal" variant="outlined" inputRef={projectName} />
            <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Project ID" style={{ margin: 10 }} placeholder="Project ID" margin="normal" variant="outlined" inputRef={projectId}/>
            <TextField className={classes.textFieldStyle} placeholder="MultiLine with rows: 2 and rowsMax: 4" multiline rows={2} rowsMax={4} id="outlined-full-width" label="Project Description" style={{ margin: 10 }} placeholder="Project Description" margin="normal" variant="outlined" inputRef={projectDesc} />
            <TextField className={classes.textDateFieldStyle} id="outlined-full-width" label="Start Date" type="Date" style={{ margin: 15 }} placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectStart} />
            <TextField className={classes.textDateFieldStyle} id="outlined-full-width" label="End Date" type="Date" style={{ margin: 15}} placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectEnd} />
            <Button className={classes.buttonStyle} style={{ margin: 15, marginBottom: "3em"}} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </form>
        </Card>
      </Grid>
    </>
  )
}

export default withStyles(styles)(Createproject);