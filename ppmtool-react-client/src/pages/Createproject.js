import React, {useRef} from 'react'
import { Grid, TextField, Card, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
    }
}))

export default function Createproject(){

  const classes = useStyles();
  const theme = useTheme();

  const projectName = useRef();
  const projectId = useRef();
  const projectDesc = useRef();
  const projectStart = useRef();
  const projectEnd = useRef();

  return(
    <>
      <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1}>
        <Card className={classes.cardStyle}>
          <Typography className={classes.typographyStyle}><h1>Create Project</h1></Typography>
          <form noValidate autoComplete="off" className={classes.formStyle}>
              <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Project Name" style={{ margin: 10 }} placeholder="Project Name" margin="normal" variant="outlined" ref={projectName} />
              <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Project ID" style={{ margin: 10 }} placeholder="Project ID" margin="normal" variant="outlined" ref={projectId}/>
              <TextField className={classes.textFieldStyle} placeholder="MultiLine with rows: 2 and rowsMax: 4" multiline rows={2} rowsMax={4} id="outlined-full-width" label="Project Description" style={{ margin: 10 }} placeholder="Project Description" margin="normal" variant="outlined" ref={projectDesc} />
              <TextField className={classes.textDateFieldStyle} id="outlined-full-width" label="Start Date" type="Date" style={{ margin: 15 }} placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} ref={projectStart} />
              <TextField className={classes.textDateFieldStyle} id="outlined-full-width" label="End Date" type="Date" style={{ margin: 15, marginBottom: "3em"}} placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} ref={projectEnd} />
          </form>
        </Card>
      </Grid>
    </>
  )
}

