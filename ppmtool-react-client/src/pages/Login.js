import React, { useRef, useState } from 'react';
import { Grid, Typography, TextField, Card, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { SET_CURRENT_USER, GET_ERRORS } from '../actions/types';
import setJWTToken from '../utils/setJWTToken'

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

export default function Login() {

  const classes = useStyles();
  const theme = useTheme();
  const username = useRef();
  const password = useRef();
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {
      let newUser = {
        username: username.current.value,
        password: password.current.value,
      }
      verifyUser(newUser);
  }

  async function verifyUser(user) {
    try{
      const res = await axios.post('/api/users/login', user)
      const { token } = res.data;
      localStorage.setItem("jwtToken", token)
      setJWTToken(token);
      const decoded = jwt_decode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      })
      history.push("/dashboard")
    } catch(err){
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
      setError(err.response.data)
    }
  }

  return(
    <>
      <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
        <Card className={classes.cardStyle}>
          <Typography variant="h3" className={classes.typographyStyle}>Welcome, please log in</Typography>
          <form noValidate autoComplete="off" className={classes.formStyle}>
            <TextField className={classes.textFieldStyle} label="E-mail (User Name)" style={{ margin: 10 }} type="email" placeholder="E-mail (User Name)" margin="normal" variant="outlined" inputRef={username} />
            {/* <div className={classes.errorStyle}>{error.projectName}</div> */}
            <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Password" type="password" style={{ margin: 10 }} placeholder="Password" margin="normal" variant="outlined" inputRef={password}/>
            {/* <div className={classes.errorStyle}>{error.description}</div> */}
            <Button className={classes.buttonStyle} style={{ margin: 15, marginBottom: "3em"}} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          </form>
        </Card>
      </Grid>
    </>
  )
}