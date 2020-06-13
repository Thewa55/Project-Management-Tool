import React from 'react';
import { Grid, withStyles, Typography, Button,Paper } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  boardStyling: {
    marginTop: theme.spacing(3)
  },
  title: {
    fontSize: "5em",
    [theme.breakpoints.down("sm")]:{
      fontSize: "3em"
    }
  },
  outerPaper:{
    width: "90%",
  },
  paper:{
    margin: "1em",
    width: "80%"
  }
}));

export default function Projectboard() {

  
  const classes = useStyles();
  const theme = useTheme();


  function Todo() {
    return (
      <React.Fragment>
          <Paper className={classes.paper}>To Do</Paper>
          <Paper className={classes.paper}>item2</Paper>
          <Paper className={classes.paper}>item3</Paper>
      </React.Fragment>
    );
  }

  function InProgress() {
    return (
      <React.Fragment>
          <Paper className={classes.paper}>In Progress</Paper>

          <Paper className={classes.paper}>item2</Paper>

          <Paper className={classes.paper}>item3</Paper>

          <Paper className={classes.paper}>item3</Paper>
  
      </React.Fragment>
    );
  }

  function Complete() {
    return (
      <React.Fragment>
          <Paper className={classes.paper}>Complete</Paper>

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
          Project Board
        </Typography>
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