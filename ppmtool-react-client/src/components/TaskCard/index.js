import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography, Button, Card, CardContent, CardActionArea, CardActions } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardStyle: {
    margin: "1em",
    width: "90%",
  }
}))

export default function TaskCard(props) {

  const classes = useStyles();
  const theme = useTheme();    
  
  //     const [priorityColor, setColor] = useState({
//         color: "Red",
//         text: "High"
//     });

//     // if(props.projectTask.priority === 2){
//     //   setColor({color: "dodgerblue", text: "Medium"});
//     // }
//     // if(props.projectTask.priority === 3){
//     //     setColor({color: "#008000", text: "Low"});
//     //   }

  return(
    <Card className={classes.cardStyle} elevation={3}>
      <CardActionArea>
        <CardContent>
          <Typography color="textSecondary" variant="h6" gutterBottom >
            ID: {props.projectTask.projectSequence} - Priority -
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {props.projectTask.summary}
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{fontSize: "1.5em"}}>
            {props.projectTask.acceptanceCriteria}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
          <Button size="small" color="primary">
            View/Update
          </Button>
          <Button size="small" color="primary" >
            Delete
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}