import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography';
import Image1 from '../../assets/images/Launch.jpg'
import Image2 from '../../assets/images/Notes.jpg'

const useStyles = makeStyles({
  root: {
  },
  media: {
    height: 300,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <>
    <Grid item xs={12} md={6}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${Image1}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Launch your ideas...
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          from just thoughts to a completed project. Every project starts off with an abundance of tasks and inputs, we are here from the start to help you organize and track every step of the way.
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    <Grid item xs={12} md={6}>
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`${Image2}`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Physical notes are great...
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          to keep track of all the necessary tasks. Wouldn't it be better to take the notes with you on the go, with the ability to add and updates the notes. Life gets busy and we're here to help you focus on things that matter most. 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    </>
  );
}
