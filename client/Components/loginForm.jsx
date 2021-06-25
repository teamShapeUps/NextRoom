// login form
import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, TextField } from "@material-ui/core";

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


  const [count, setCount] = useState(0);


  function clickHandler(e){
    setCount(count+1);
    console.log(`clicked ${count} times`);
    // e.preventDefault();
  }

  return (
    <div className={classes.div}>
    <h1>Login:</h1>
    <Box className={classes.box}>
      
        <TextField placeholder = "username" required/>
        <br></br>
        <TextField placeholder = "password" required/> 
        <br></br>
        <Button type ="submit" className={classes.button} onClick={clickHandler}>PRESS THIS, YOU FOOL!!!</Button>
     
    </Box>
    </div>
)
};