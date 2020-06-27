import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '80%',
    marginTop: '1em'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  linkStyle: {
    textDecoration: "none"
  },
}));

export default function SimpleExpansionPanel(props) {

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
          style={priorityColor}
        >
          <Typography style={{fontSize: "1.25em"}} className={classes.heading}>
            {props.projectTask.summary}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            {props.projectTask.acceptanceCriteria}
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelDetails>
          <Link to={`/updatetask/${props.projectId}/${props.projectTask.projectSequence}`} style={{textDecoration: "none"}}>
            <Button variant="outlined" size="small" color="primary">View/Update</Button>
          </Link>
          <Button>Delete</Button>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {/* <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Expansion Panel 2</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel> */}
    </div>
  );
}
