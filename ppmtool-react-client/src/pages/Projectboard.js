import React from 'react';
import { Grid, withStyles, Typography, Button, Paper, } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  boardStyling: {
    marginTop: theme.spacing(3)
  },
  title: {
    fontSize: "4em",
    [theme.breakpoints.down("sm")]:{
      fontSize: "2em",
      textAlign: "center"
    }
  },
  outerPaper:{
    width: "90%",
    paddingBottom: "2em",
    marginTop: "1em"
  },
  paper:{
    margin: "1em",
    width: "80%",
    paddingBottom: "2em"
  },
  header: {
    margin: "1em",
    width: "80%",
    marginTop: "1em",
    fontSize: "2em",
    padding: ".5em",
    textAlign: "center",
    color: "white",
    [theme.breakpoints.down("sm")]:{
        fontSize: "1.5em",
        padding: ".5em"
    }
  },
  buttonStyle: {
    padding: "1em",
    [theme.breakpoints.down("sm")]:{
      marginTop: ".5em",
      padding: ".5em"
    }
  }
}));

export default function Projectboard() {

  
  const classes = useStyles();
  const theme = useTheme();

  let url = window.location.pathname;
  let id = url.substring(url.lastIndexOf("/") + 1)

  function Todo() {
    return (
      <React.Fragment>
          <Paper className={classes.header} style={{backgroundColor: 'grey'}} elevation={3}>To Do</Paper>
          <Paper className={classes.paper}>item2</Paper>
          <Paper className={classes.paper}>item3</Paper>
      </React.Fragment>
    );
  }

  function InProgress() {
    return (
      <React.Fragment>
          <Paper className={classes.header} style={{backgroundColor: 'dodgerblue'}} elevation={3}>In Progress</Paper>

          <Paper className={classes.paper}>item2</Paper>

          <Paper className={classes.paper}>item3</Paper>

          <Paper className={classes.paper}>item3</Paper>
  
      </React.Fragment>
    );
  }

  function Complete() {
    return (
      <React.Fragment>
          <Paper className={classes.header} style={{backgroundColor: 'lightgreen'}} elevation={3}>Completed</Paper>

          <Paper className={classes.paper}>item2</Paper>

          <Paper className={classes.paper}>item3</Paper>

          <Paper className={classes.paper}>item3</Paper>
  
      </React.Fragment>
    );
  }

  return(
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.boardStyling}>
        <Typography className={classes.title}>
            {id} Project Board
        </Typography>
        <Grid container justify="center">
          <Button className={classes.buttonStyle} variant="contained" color="primary" href={`/createtask/${id}`}>Create Project Task</Button>
        </Grid>
        <Paper className={classes.outerPaper}>
          <Grid container direction="row" justify="center" spacing={1} >
            <Grid container md={4}>
              <Grid container item direction="column" justify="flex-start" alignItems="center" md={12} spacing={3}>
                <Todo />
              </Grid>
            </Grid>
            <Grid container md={4}>
            <Grid container item direction="column" justify="flex-start" alignItems="center" md={12} spacing={3}>
              <InProgress />
            </Grid>
            </Grid>
            <Grid container md={4}>
            <Grid container item direction="column" justify="flex-start" alignItems="center" md={12} spacing={3}>
              <Complete />
            </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}