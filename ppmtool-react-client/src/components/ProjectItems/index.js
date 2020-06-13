import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, CardContent, Button, Typography, Grid } from '@material-ui/core';
import DeleteModal from '../DeleteModal'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '80%',
    height: '10em',
    marginTop: '1em',
    [theme.breakpoints.down("sm")]:{
      height: '15em'
    }
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  innerGrid:{
    // marginTop: "1em"
  },
  button:{
    width: "80%",
    marginTop: "1em",
    textAlign: "center",
    [theme.breakpoints.down("md")]:{
        margin: ".3em"
    },
    [theme.breakpoints.down("sm")]:{
        width: "30%",
        margin: ".15em"
    }
  }
}));

export default function ProjectItems(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.root} elevation = {3}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">{props.project.projectName} - ID: {props.project.projectIdentifier}</Typography>
              <Typography variant="subtitle1" color="textSecondary">{props.project.description} </Typography>
            </CardContent>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
            <Grid container direction="row" justify="center" alignItems="center" className={classes.innerGrid}>
              <Button className={classes.button} variant="outlined" href={`/projectboard/${props.project.projectIdentifier}`}>Board </Button>
              <Button className={classes.button} variant="outlined" href={`/updateproject/${props.project.projectIdentifier}`} color="primary">Update</Button>
              <DeleteModal projectId={props.project.projectIdentifier}/>
            </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}