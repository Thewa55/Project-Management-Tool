// import React, { useRef, useState, useEffect } from 'react';
// import { Grid, Typography, TextField, Card, Button } from '@material-ui/core';
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';
// import { GET_ERRORS } from '../actions/types';
// import { useDispatch, useSelector } from 'react-redux';

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

// export default function Signup() {

//   const jwtToken = localStorage.jwtToken;
//   const classes = useStyles();
//   const theme = useTheme();
//   const username = useRef();
//   const fullName = useRef();
//   const password = useRef();
//   const confirmPassword = useRef();
//   const history = useHistory();
//   const dispatch = useDispatch();
//   const [error, setError] = useState({})


//   if(jwtToken){
//     history.push('/dashboard')
//   }

//   async function createUser(user) {
//     try{
//       await axios.post('/api/users/register', user)
//       dispatch({
//         type: GET_ERRORS,
//         payload: {}
//       })
//       history.push("/login")
//     } catch(err){
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//       setError(err.response.data)
//     }
//   }

//   useEffect(() => {}, [error])

//   const handleSubmit = () => {
//     let newUser = {
//       username: username.current.value,
//       fullName: fullName.current.value,
//       password: password.current.value,
//       confirmPassword: confirmPassword.current.value
//     }

//     createUser(newUser);
//   }

//   return(
//     <>
//       <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
//         <Card className={classes.cardStyle}>
//           <Typography variant="h2" className={classes.typographyStyle}>Create an account</Typography>
//           <form noValidate autoComplete="off" className={classes.formStyle}>
//             <TextField className={classes.textFieldStyle} label="Username (E-mail)" style={{ margin: 10 }} type="email" placeholder="E-mail (User Name)" margin="normal" variant="outlined" inputRef={username} />
//             <div className={classes.errorStyle}>{error.username}</div>
//             <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Full Name" style={{ margin: 10 }} placeholder="Full Name" type="name" margin="normal" variant="outlined" inputRef={fullName}/>
//             <div className={classes.errorStyle}>{error.fullName}</div>
//             <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Password" type="password" style={{ margin: 10 }} placeholder="Password" margin="normal" variant="outlined" inputRef={password}/>
//             <div className={classes.errorStyle}>{error.password}</div>
//             <TextField className={classes.textFieldStyle} id="outlined-full-width" label="Confirm Password" type="password" style={{ margin: 10 }} placeholder="Confirm Password" margin="normal" variant="outlined" inputRef={confirmPassword}/>
//             <div className={classes.errorStyle}>{error.confirmPassword}</div>
//             {/* <TextField className={classes.textDateFieldStyle} id="outlined-full-width" label="Start Date" type="Date" style={{ margin: 15 }} placeholder="Project Name" margin="normal" variant="outlined" InputLabelProps={{ shrink: true }} inputRef={projectStart} /> */}
//             <Button className={classes.buttonStyle} style={{ margin: 15, marginBottom: "3em"}} variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
//           </form>
//         </Card>
//       </Grid>
//     </>
//   )
// }



// Material UI Start up code
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




export default function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="Name"
                variant="outlined"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name=" confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end" style={{marginBottom: "2em"}}>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}