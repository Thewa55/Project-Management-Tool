import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Box, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Grid, Typography } from '@material-ui/core/';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteTaskModal from '../DeleteTaskModal'
import { Link } from 'react-router-dom'
import AssistantPhotoOutlinedIcon from '@material-ui/icons/AssistantPhotoOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    marginTop: '1em'
  },
  heading: {
    display: 'flex',
    fontWeight: theme.typography.fontWeightRegular,
  },
  linkStyle: {
    textDecoration: "none"
  },
  buttonStyle: {
    fontSize: "1em"
  },
}));

export default function TaskExpansionPanel(props) {

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

  
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          // style={{backgroundColor: "#FFEFD5"}}
        >
          <Typography className={classes.heading}>
            <Avatar style={priorityColor}>
              <AssistantPhotoOutlinedIcon />
            </Avatar>
            <div style={{marginLeft:"1em"}}>
            {props.projectTask.summary}
            </div>
          </Typography>
        </ExpansionPanelSummary>
        {props.projectTask.dueDate === null ? <></> : 
          <>
          <ExpansionPanelDetails style={{paddingBottom: ".5em", paddingTop: ".5em"}}>
            <Typography>
              <i>Due Date</i>: {props.projectTask.dueDate}
            </Typography>
          </ExpansionPanelDetails>
          <hr style={{width: '80%'}}/>
          </>
        }
        <ExpansionPanelDetails style={{paddingBottom: ".5em", paddingTop: ".5em"}}>
          <Typography>
            <i>Criteria</i>: {props.projectTask.acceptanceCriteria}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails style={{paddingBottom: ".5em", paddingTop: ".5em"}}>
          <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
            <Grid item>
              <Link to={`/updatetask/${props.projectId}/${props.projectTask.projectSequence}`} style={{textDecoration: "none"}}>
                <Button variant="outlined" size="small" color="primary" className={classes.buttonStyle}>Update</Button>
              </Link>
            </Grid>
            <Grid item>
              < DeleteTaskModal ID={props.projectId} Sequence={props.projectTask.projectSequence}/>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}
