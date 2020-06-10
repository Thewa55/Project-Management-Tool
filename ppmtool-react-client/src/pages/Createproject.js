import React from 'react'
import { Input, Grid, TextField, Card, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    cardStyle:{
      width: "80%",
      marginTop: theme.spacing(6)
    },
    textFieldStyle:{
      width: "90%",
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

  return(
    <>
      <Grid container direction="column" justify="flex-start" alignItems="center" spacing={1}>
        <Card className={classes.cardStyle}>
          <Typography className={classes.typographyStyle}><h1>Create Project</h1></Typography>
          <form noValidate autoComplete="off" className={classes.formStyle}>
            <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Project Name" style={{ margin: 8 }} placeholder="Project Name" margin="normal" variant="outlined" />
            <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Project Name" style={{ margin: 8 }} placeholder="Project Name" margin="normal" variant="outlined" />
            <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Project Name" style={{ margin: 8 }} placeholder="Project Name" margin="normal" variant="outlined" />
            <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Project Name" style={{ margin: 8, marginBottom: "2em" }} placeholder="Project Name" margin="normal" variant="outlined" />
          </form>
        </Card>
      </Grid>
    </>
  )
}

