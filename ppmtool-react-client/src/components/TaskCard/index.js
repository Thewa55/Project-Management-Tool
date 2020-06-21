import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, Card, CardContent, CardActionArea, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom'
import DeleteTaskModal from '../DeleteTaskModal'

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    margin: "1em",
    width: "93%",
    [theme.breakpoints.down("md")]:{
      width: '88%'
    }
  },
  cardTitle: {
    width: "100%",
    padding: "1em"
  },
  buttonStyle: {
    fontSize: "1em"
  },
  linkStyle: {
    textDecoration: "none"
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
}))

export default function TaskCard(props) {

  const classes = useStyles();
  
  let priorityColor = { backgroundColor : "red" };
  let text = "High"
  
  if(props.projectTask.priority === 2){
    priorityColor = { backgroundColor : "dodgerblue"} ; 
    text = "Medium"
  }
  if(props.projectTask.priority === 3){
    priorityColor = { backgroundColor: "#008000"}; 
    text = "Low"
  }

  return(
    <Card className={classes.cardStyle} elevation={3}>
      <CardActionArea>
        <Typography color="textSecondary" className={classes.cardTitle} variant="h6" gutterBottom style={priorityColor}>
            ID: {props.projectTask.projectSequence} - Priority - {text}
        </Typography>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.projectTask.summary}
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{fontSize: "1.5em"}}>
            {props.projectTask.acceptanceCriteria}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container direction="row" justify="center" alignItems="center" spacing={10}>
          <Grid item>
            <Link to={`/updatetask/${props.projectId}/${props.projectTask.projectSequence}`} className={classes.linkStyle}>
              <Button variant="outlined" size="small" color="primary" className={classes.buttonStyle}>
                View/Update
              </Button>
            </Link>
          </Grid>
          <Grid item>
            < DeleteTaskModal ID={props.projectId} Sequence={props.projectTask.projectSequence}/>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}