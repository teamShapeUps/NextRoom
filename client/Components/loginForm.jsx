// login form
import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, TextField, Collapse, Switch } from "@material-ui/core";

const useStyles = makeStyles({
  button: {
    // display:'flex',
    // flexDirection: 'row',
    justify: 'center',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    textAlign: 'center',
  
  },
  box: {
      display: 'grid',
      placeItems: 'center',
      paddingBottom: '10%'
  }, 
  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'grey',
    margin: '0 40% 0 40%',
    width: 'clamp(100, 200, 300)',
    borderRadius: '5%',
    boxShadow: '10px 5px 5px red'
  }
});



export default function LoginForm() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [isUser, setUser] = useState(false);
  

  function clickHandler(e){
    console.log(`Username is ${username} and Password is ${password}`);
    e.preventDefault();
  }

  const validateForm = function() {
    return username.length > 0 && password.length > 0;
  }

  return (
    <div className={classes.div}>
    <h1>{checked? "Sign Up": "Login"}</h1>
    <Box className={classes.box}>
      <Collapse in={!checked} orientation={'horizontal'}>
      <Switch onChange={() => setUser(!isUser)}></Switch>
        <p>{isUser? "User": "Host"}</p>
        <TextField placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        <br></br>
        <TextField placeholder="password" onChange={(e) => setPassword(e.target.value)} /> 
        <br></br>
        <Button 
          type ="submit" 
          className={classes.button} 
          disabled={!validateForm()} 
          onClick={clickHandler}
          >PRESS THIS, YOU FOOL!!!</Button>
      </Collapse>
    
      <br></br>
    
      <a onClick={() => setChecked(!checked)}>{checked? 'Back to Login':'Sign up!?'}</a>
      <Collapse in={checked} orientation={'horizontal'}>
        <Switch onChange={() => setUser(!isUser)}></Switch>
        <p>{isUser? "User": "Host"}</p>
        <br></br>
        <br></br>
        <TextField placeholder ="username"></TextField>
        <br></br>
        <br></br>
        <TextField placeholder ="password"></TextField>
        <br></br>
        <br></br>
        <Button className={classes.button}>Create New User</Button>
      </Collapse>
      </Box>
    </div>
)
};