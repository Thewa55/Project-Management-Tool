import React from "react";
import { Grid, withStyles, Typography, Button } from '@material-ui/core';
import ProjectItems from "../components/ProjectItems"


const styles = theme => ({
    dashPadding: {
      marginTop: theme.spacing(3)
    },
    title: {
      fontSize: "5em",
      [theme.breakpoints.down("sm")]:{
        fontSize: "3em"
      }
    } 
})

function Dashboard(props){

  const {classes} = props

  return(
    <div>  
      <Grid container direction="row" justify="center" alignItems="center" className={classes.dashPadding}>
        <Typography>
          <div className={classes.title}>Projects</div>
        </Typography>
        <Grid container justify="center">
          <Button variant="contained" color="primary">Create Project</Button>
        </Grid>
      </Grid>

      <hr style={{width: "80%"}}/>
      <Grid container direction="row" justify="center" alignItems="center" className={classes.dashPadding}>
        <ProjectItems />
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Dashboard);