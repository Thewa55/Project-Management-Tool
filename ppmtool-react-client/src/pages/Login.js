import React, { useRef, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Grid, Typography }from '@material-ui/core/';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { SET_CURRENT_USER, GET_ERRORS } from '../actions/types';
import setJWTToken from '../utils/setJWTToken'
import Image from '../assets/images/Login.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorStyle:{
    color: "red",
    fontSize: "1em",
  }
}));

export default function Login() {
  const classes = useStyles();
  const jwtToken = localStorage.jwtToken;
  const username = useRef();
  const password = useRef();
  const [error, setError] = useState({
    username: "",
    password: ""
  });
  const dispatch = useDispatch();
  const history = useHistory();

  if(jwtToken){
    history.push('/dashboard')
  }

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



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={username}
            />
            <div className={classes.errorStyle}>{error.username}</div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={password}
            />
            <div className={classes.errorStyle}>{error.password}</div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}