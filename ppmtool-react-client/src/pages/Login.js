// import React, { useRef, useState } from 'react';
// import { Grid, Typography, TextField, Card, Button } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import { useDispatch } from 'react-redux';
// import { SET_CURRENT_USER, GET_ERRORS } from '../actions/types';
// import setJWTToken from '../utils/setJWTToken'

// const useStyles = makeStyles((theme) => ({
//     cardStyle:{
//       width: "80%",
//       marginTop: theme.spacing(6)
//     },
//     textFieldStyle:{
//       width: "90%",
//     },
//     formStyle:{
//       alignItems: "center",
//       textAlign: "center"
//     },
//     typographyStyle:{
//       textAlign: "center",
//       padding: ".5em"
//     },
//     buttonStyle:{
//       width: "90%",
//       padding: "1em"
//     },
//     errorStyle:{
//       color: "red",
//       fontSize: "1em",
//       textAlign: "left",
//       marginLeft: "5%"
//     }
// }))

// export default function Login() {

//   const jwtToken = localStorage.jwtToken;
//   const classes = useStyles();
//   const username = useRef();
//   const password = useRef();
//   const [error, setError] = useState({
//     username: "",
//     password: ""
//   });
//   const dispatch = useDispatch();
//   const history = useHistory();

//   if(jwtToken){
//     history.push('/dashboard')
//   }

//   const handleSubmit = () => {
//       let newUser = {
//         username: username.current.value,
//         password: password.current.value,
//       }
//       verifyUser(newUser);
//   }

//   async function verifyUser(user) {
//     try{
//       const res = await axios.post('/api/users/login', user)
//       const { token } = res.data;
//       localStorage.setItem("jwtToken", token)
//       setJWTToken(token);
//       const decoded = jwt_decode(token);
//       dispatch({
//         type: SET_CURRENT_USER,
//         payload: decoded
//       })
//       history.push("/dashboard")
//     } catch(err){
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//       setError(err.response.data)
//     }
//   }

//   console.log(error)
//   return(
//     <>
//       <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
//         <Card className={classes.cardStyle}>
//           <Typography variant="h3" className={classes.typographyStyle}>Welcome, please log in</Typography>
//           <form noValidate autoComplete="off" className={classes.formStyle}>
//             <TextField className={classes.textFieldStyle} label="E-mail (User Name)" style={{ margin: 10 }} type="email" placeholder="E-mail (User Name)" margin="normal" variant="outlined" inputRef={username} />
//             <div className={classes.errorStyle}>{error.username}</div>
//             <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Password" type="password" style={{ margin: 10 }} placeholder="Password" margin="normal" variant="outlined" inputRef={password}/>
//             <div className={classes.errorStyle}>{error.password}</div>
//             <Button className={classes.buttonStyle} style={{ margin: 15, marginBottom: "3em"}} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
//           </form>
//         </Card>
//       </Grid>
//     </>
//   )
// }


import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();

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
            />
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
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}