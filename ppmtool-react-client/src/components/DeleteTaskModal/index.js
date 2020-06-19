import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Button, Typography, Grid } from '@material-ui/core/';
import { DELETE_PROJECT, GET_ERRORS } from '../../actions/types';
import { useDispatch } from 'react-redux'
import axios from 'axios'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '25em',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    [theme.breakpoints.down("xs")]:{
      width: '15em'
    }
  },
  titleStyle: {
    textAlign: 'center'
  },
  bodyStyle: {
    textAlign: 'center',
    color: 'red',
    margin: '.5em'
  },
  buttonStyle: {
    margin: '.5em'
  },
  button:{
    width: "80%",
    marginTop: "1em",
    textAlign: "center",
    marginBottom: "1em",
    [theme.breakpoints.down("md")]:{
        margin: ".3em"
    },
    [theme.breakpoints.down("sm")]:{
        width: "30%",
        margin: ".15em"
    }
  }
}));

export default function DeleteModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTask = async (projectId, projectSequence,) =>{
    try{
      await axios.delete(`/api/backlog/${projectId}/${projectSequence}`);
      handleClose()
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    } catch(err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
  }
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Typography className={classes.titleStyle} component="h6" variant="h6">Are you sure you want to delete the project?</Typography>
      <Typography className={classes.bodyStyle}>Once deleted, it will be gone forever</Typography>
      <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
        <Button variant="outlined" color="primary" className={classes.buttonStyle} onClick={() => deleteTask(props.ID, props.Sequence)}>Confirm</Button>
        <Button variant="outlined" color="secondary" className={classes.buttonStyle} onClick={handleClose}>Cancel</Button>
      </Grid>
    </div>
  );

  return (
    <>
      <Button variant="outlined" color="secondary" className={classes.button}onClick={handleOpen}>
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
