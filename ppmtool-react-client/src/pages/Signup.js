import React, { useRef, useState, useEffect } from 'react';
import { Grid, Typography, TextField, Card, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { GET_ERRORS } from '../actions/types';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    cardStyle:{
      width: "80%",
      marginTop: theme.spacing(6)
    },
    textFieldStyle:{
      width: "90%",
    },
    formStyle:{
      alignItems: "center",
      textAlign: "center"
    },
    typographyStyle:{
      textAlign: "center",
      padding: ".5em"
    },
    buttonStyle:{
      width: "90%",
      padding: "1em"
    },
    errorStyle:{
      color: "red",
      fontSize: "1em",
      textAlign: "left",
      marginLeft: "5%"
    }
}))

export default function Signup() {

  const classes = useStyles();
  const theme = useTheme();
  const username = useRef();
  const fullName = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const [error, setError] = useState({})


  async function createUser(user) {
    try{
      const res = await axios.post('/api/users/register', user)
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
      history.push("/login")
    } catch(err){
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      setError(err.response.data)
    }
  }

  useEffect(() => {}, [error])

  const handleSubmit = () => {
    let newUser = {
      username: username.current.value,
      fullName: fullName.current.value,
      password: password.current.value,
      confirmPassword: confirmPassword.current.value
    }

    createUser(newUser);
  }

  return(
    <>
      <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
        <Card className={classes.cardStyle}>
          <Typography variant="h2" className={classes.typographyStyle}>Create an account</Typography>
          <form noValidate autoComplete="off" className={classes.formStyle}>
            <TextField className={classes.textFieldStyle} label="Username (E-mail)" style={{ margin: 10 }} type="email" placeholder="E-mail (User Name)" margin="normal" variant="outlined" inputRef={username} />
            <div className={classes.errorStyle}>{error.username}</div>
            <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Full Name" style={{ margin: 10 }} placeholder="Full Name" type="name" margin="normal" variant="outlined" inputRef={fullName}/>
            <div className={classes.errorStyle}>{error.fullName}</div>
            <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Password" type="password" style={{ margin: 10 }} placeholder="Password" margin="normal" variant="outlined" inputRef={password}/>
            <div className={classes.errorStyle}>{error.password}</div>
            <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Confirm Password" type="password" style={{ margin: 10 }} placeholder="Confirm Password" margin="normal" variant="outlined" inputRef={confirmPassword}/>
            <div className={classes.errorStyle}>{error.confirmPassword}</div>
            {/* <TextField className={classes.textDateFieldStyle} id="outlined-full-width" label="Start Date" type="Date" style={{ margin: 15 }} placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectStart} /> */}
            <Button className={classes.buttonStyle} style={{ margin: 15, marginBottom: "3em"}} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </form>
        </Card>
      </Grid>
    </>
  )
}