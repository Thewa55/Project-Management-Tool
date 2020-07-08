import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  errorStyle:{
    color: "red",
    fontSize: "1em",
    textAlign: "left",
    paddingTop: '0',
    paddingBotttom: '0'
  },
}))


export default function TextFieldComp(props){
  console.log(props)
  const classes = useStyles()

  return(
    <Grid item xs={12} md={props.medium} style={{paddingTop: '0', paddingBottom: '0'}}>
      <TextField 
        label={props.label}
        fullWidth 
        placeholder={props.label}
        margin="normal" 
        variant="outlined" 
        inputRef={props.textRef} 
        rows={props.rows}
        rowsMax={props.rowsMax}
        multiline
      />
      <div className={classes.errorStyle}>{props.textError}</div>
    </Grid>
  )
}